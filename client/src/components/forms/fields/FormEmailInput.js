import React from "react";
import { FormField, MaskedInput } from "grommet";

const FormEmailInput = ({ label, name, required, value, onChange }) => (
  <FormField label={label} name={name} required={required}>
    <MaskedInput
      name={name}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      mask={[
        { regexp: /^[\w\-_.]+$/, placeholder: "example" },
        { fixed: "@" },
        { regexpt: /^[\w]+$/, placehodler: "my" },
        { fixed: "." },
        { regexp: /^[\w]+$/, placeholder: "com" },
      ]}
    />
  </FormField>
);

export default FormEmailInput;
