import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

export const ActivityForm = observer(() => {
  const { activityStore } = useStore();
  const {
    // createActivity,
    // updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  // const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  // const handleSubmit = () => {
  //   if (!activity.id) {
  //     activity.id = uuid();
  //     createActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   } else {
  //     updateActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setActivity({ ...activity, [name]: value });
  // };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Formik
        enableReinitialize // activity gets updated when the value changes
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Field placeholder="Title" name="title" />
            <Field placeholder="Description" name="description" />
            <Field placeholder="Category" name="category" />
            <Field placeholder="Date" name="date" type="date" />
            <Field placeholder="City" name="city" />
            <Field placeholder="Venue" name="venue" />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Close"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
