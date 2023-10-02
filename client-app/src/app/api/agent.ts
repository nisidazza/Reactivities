import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activities, Activity, ActivityFormValues } from "../models/activity";
import { PaginatedResult } from "../models/pagination";
import { IProfile, Photo, UserActivity } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;
    const dataErrors = data.errors;
    switch (status) {
      case 400:
        if (config.method === "get" && dataErrors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        if (dataErrors) {
          const modalStateErrors = [];
          for (const key in dataErrors) {
            if (dataErrors[key]) {
              modalStateErrors.push(dataErrors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startWith('Baerer error="invalid_token')
        ) {
          store.userStore.logout();
          toast.error("Session expired - please login again");
        } else {
          toast.error("unauthorised");
        }
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const ActivitiesRequests = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Activities>>("/activities", { params })
      .then(responseBody), //we're not using the requests above, so we need to pass the response body
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: ActivityFormValues) =>
    requests.post<void>("activities/", activity),
  update: (activity: ActivityFormValues) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
  attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
};

const AccountRequests = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
  verifyEmail: (token: string, email: string) =>
    requests.post<void>(
      `/account/verifyEmail?token=${token}&email=${email}`,
      []
    ),
  resendEmailConfirm: (email: string) =>
    requests.get(`/account/resendEmailConfirmationLink?email=${email}`),
};

const ProfilesRequests = {
  get: (username: string) => requests.get<IProfile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    // needs to match the name of the property in the API
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => {
    requests.post<void>(`/photos/${id}/setMain`, {});
  },
  deletePhoto: (id: string) => requests.del<void>(`/photos/${id}`),
  update: (profile: Partial<IProfile>) =>
    requests.put<Partial<IProfile>>(`/profiles`, profile),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
    requests.get<IProfile[]>(`/follow/${username}?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
    requests.get<UserActivity[]>(
      `/profiles/${username}/activities?predicate=${predicate}`
    ),
};

const agent = {
  ActivitiesRequests,
  AccountRequests,
  ProfilesRequests,
};

export default agent;
