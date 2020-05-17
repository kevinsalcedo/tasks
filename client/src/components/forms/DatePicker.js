import React, { useState } from "react";
import { Box, Button, Text, DropButton, Calendar } from "grommet";
import { FormClose } from "grommet-icons";
import moment from "moment";

const DatePicker = ({ name, onChange, value }) => {
  const [open, setOpen] = useState(false);

  const onSelect = (selectedDate) => {
    const newDate = moment(selectedDate).startOf("day");
    setOpen(false);
    if (newDate.isSame(value)) {
      onChange(null);
    } else {
      onChange(moment(selectedDate));
    }
  };

  return (
    <Box align='center' direction='row'>
      <DropButton
        name={name}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropContent={
          <Box align='center' pad='small' round>
            <Calendar
              size='small'
              onSelect={onSelect}
              date={value ? value.format() : null}
            />
          </Box>
        }
      >
        <Box direction='row' gap='medium' align='center' pad='small'>
          <Text>{value ? value.format("MM/DD/YYYY") : "Select date"}</Text>
        </Box>
      </DropButton>

      {value && <Button icon={<FormClose />} onClick={() => onChange(null)} />}
    </Box>
  );
};

export default DatePicker;
