import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { MyTextArea } from "../../app/common/form/MyTextArea";
import { MyTextInput } from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export const ProfileEditForm: FC<{ setEditMode: (editMode: boolean) => void }> =
  observer(({ setEditMode }) => {
    const {
      profileStore: { profile, updateProfile },
    } = useStore();

    const validationSchema = Yup.object({
      displayName: Yup.string().required("displayName is required"),
    });

    return (
      <Segment>
        <Header content="Profile Details" sub color="teal" />
        <Formik
          enableReinitialize
          initialValues={{
            displayName: profile?.displayName,
            bio: profile?.bio,
          }}
          onSubmit={(values) =>
            updateProfile(values).then(() => {
              setEditMode(false);
            })
          }
          validationSchema={validationSchema}
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form className="ui form" autoComplete="off">
                <MyTextInput name="displayName" placeholder="Display Name" />
                <MyTextArea rows={3} placeholder="Bio" name="bio" />
                <Button
                  disabled={!isValid || !dirty}
                  loading={isSubmitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Update profile"
                />
              </Form>
            );
          }}
        </Formik>
      </Segment>
    );
  });
