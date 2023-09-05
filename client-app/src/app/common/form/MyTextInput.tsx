import { useField } from "formik";
import { FC } from "react";
import { Form, Label } from "semantic-ui-react";

export const MyTextInput: FC<{
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}> = ({ placeholder, name, label, type }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...field} {...{ name, placeholder, label, type }} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
