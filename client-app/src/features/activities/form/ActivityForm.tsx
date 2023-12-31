import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { MyDateInput } from "../../../app/common/form/MyDateInput";
import { MySelectInput } from "../../../app/common/form/MySelectInput";
import { MyTextArea } from "../../../app/common/form/MyTextArea";
import { MyTextInput } from "../../../app/common/form/MyTextInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

export const ActivityForm = observer(() => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } =
    activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  useEffect(() => {
    // it ensures that the activity contains the values inside the form itself
    if (id)
      loadActivity(id).then((activity) =>
        setActivity(new ActivityFormValues(activity))
      );
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        navigate(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize // activity gets updated when the value changes
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => {
          return (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <MyTextInput name="title" placeholder="Title" />
              <MyTextArea
                rows={3}
                placeholder="Description"
                name="description"
              />
              <MySelectInput
                options={categoryOptions}
                placeholder="Category"
                name="category"
              />
              <MyDateInput
                props={{
                  placeholderText: "Date",
                  name: "date",
                  showTimeSelect: true,
                  timeCaption: "time",
                  dateFormat: "MMMM d, yyyy h:mm aa",
                }}
              />
              <Header content="Location Details" sub color="teal" />
              <MyTextInput placeholder="City" name="city" />
              <MyTextInput placeholder="Venue" name="venue" />
              <Button
                disabled={isSubmitting || !isValid || !dirty}
                loading={isSubmitting}
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
          );
        }}
      </Formik>
    </Segment>
  );
});
