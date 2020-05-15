import React, { useState } from "react";
import { MaskedInput } from "grommet";
import { FormSchedule } from "grommet-icons";

const DatePicker = (props) => {
  return (
    <MaskedInput
      icon={<FormSchedule />}
      reverse
      mask={[
        {
          length: [1, 2],
          options: Array.from({ length: 12 }, (v, k) => k + 1),
          regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
          placeholder: "mm",
        },
        { fixed: "/" },
        {
          length: [1, 2],
          regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
          placeholder: "dd",
        },
        { fixed: "/" },
        {
          length: 4,
          regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
          placeholder: "yyyy",
        },
        { fixed: " " },
        {
          length: [1, 2],

          regexp: /^1[0-2]$|^[0-9]$/,
          placeholder: "hh",
        },
        { fixed: ":" },
        {
          length: 2,
          regexp: /^[0-5][0-9]$|^[0-9]$/,
          placeholder: "mm",
        },
        { fixed: " " },
        {
          length: 2,
          regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
          placeholder: "ap",
        },
      ]}
      name={props.name}
    />
  );
};

export default DatePicker;
