import { useField } from "formik";
import { FC } from "react";
import { Form, Label } from "semantic-ui-react";

export const MyTextInput: FC<{
  placeholder: string;
  name: string;
  label?: string;
}> = ({ placeholder, name, label }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...field} {...{ name, placeholder, label }} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
