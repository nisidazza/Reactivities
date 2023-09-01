import { useField } from "formik";
import { FC } from "react";
import { Form, Label } from "semantic-ui-react";

export const MyTextArea: FC<{
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}> = ({ placeholder, name, rows, label }) => {
  const [field, meta] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...{ name, placeholder, rows, label }} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
