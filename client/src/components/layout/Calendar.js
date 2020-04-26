import React, { useState } from "react";
import { Calendar as GrommetCalendar } from "grommet";
import moment from "moment";

export const Calendar = () => {
  const [dateRange, setRange] = useState([
    [moment().utc().format(), moment().add(3, "days").utc().format()],
  ]);

  const onSelect = (nextDate) => {
    const rangeDate = moment(nextDate).add(3, "days").utc().format();
    setRange([[nextDate, rangeDate]]);
  };

  return (
    <GrommetCalendar
      dates={dateRange}
      onSelect={onSelect}
      bounds={["2020-01-01", "2030-12-31"]}
    />
  );
};

export default Calendar;
