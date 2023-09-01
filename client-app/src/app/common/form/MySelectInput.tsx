import { useField } from "formik";
import { FC } from "react";
import { Form, Label, Select } from "semantic-ui-react";

export const MySelectInput: FC<{
  placeholder: string;
  name: string;
  options: { text: string; value: string }[];
  label?: string;
}> = ({ placeholder, name, options, label }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        options={options}
        value={field.value || null}
        onChange={(_, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
