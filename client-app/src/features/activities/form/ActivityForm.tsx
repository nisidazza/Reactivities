import { FC, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

export const ActivityForm: FC<{
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}> = ({ activity: selectedActivity, closeForm, createOrEdit }) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  const handleSubmit = () => {
    createOrEdit(activity);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
          type="date"
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Close"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
};
