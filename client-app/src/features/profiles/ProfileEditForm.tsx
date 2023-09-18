import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Button, Form } from "semantic-ui-react";
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
      <Formik
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
        {({ handleSubmit, isSubmitting, isValid, dirty }) => {
          return (
            <Form className="ui form" onSubmit={handleSubmit}>
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
    );
  });
