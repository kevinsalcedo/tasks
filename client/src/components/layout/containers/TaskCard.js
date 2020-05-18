import React from "react";
import { Box, CheckBox, Text, Menu } from "grommet";
import { MoreVertical } from "grommet-icons";
import moment from "moment";

const TaskCard = ({ task, onDeleteOpen, onUpdateOpen }) => {
  const renderDueDate = () => {
    let innerText = "No due date";
    if (task.endDate) {
      const now = moment().startOf("day");
      const dueDate = moment(task.endDate).startOf("day");
      const timeEnabled = task.endTimeEnabled;

      //Day comparisons for display
      if (!task.backlog) {
        const diff = dueDate.diff(now, "days");
        if (diff < 0) {
          innerText = "Past due";
        } else if (diff === 0) {
          innerText =
            "Today" + (timeEnabled ? ` ${dueDate.format("hh:mm a")}` : "");
        } else if (diff === 1) {
          innerText =
            "Tomorrow" + (timeEnabled ? ` ${dueDate.format("hh:mm a")}` : "");
        } else if (diff < 7) {
          innerText = dueDate.format("ddd" + (timeEnabled ? " hh:mm a" : ""));
        } else {
          innerText = dueDate.format("MMM Do");
        }
      }
    }
    return <Text size='xsmall'>{innerText}</Text>;
  };
  const menuItems = [
    {
      label: "Edit",
      onClick: () => onUpdateOpen(null, task),
    },
    { label: "Delete Task", onClick: onDeleteOpen },
  ];
  return (
    <Box>
      <Box
        direction='row'
        pad={{ horizontal: "medium", vertical: "xxsmall" }}
        background='light-1'
        elevation='small'
        gap='small'
        justify='between'
        align='center'
        flex={false}
        border={{
          color: task.taskList.color,
          side: "left",
          size: "large",
          style: "solid",
        }}
      >
        <Box direction='row' gap='small' align='center'>
          <CheckBox checked={task.completed} />
          <Box>
            <Text truncate>{task.name}</Text>
          </Box>
        </Box>
        <Box direction='row' gap='small' align='center'>
          {renderDueDate()}
          <Menu icon={<MoreVertical />} items={menuItems} hoverIndicator />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskCard;
