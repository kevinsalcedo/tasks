import React from "react";
import { Box, CheckBox, Text, Menu } from "grommet";
import { MoreVertical } from "grommet-icons";
import moment from "moment";

const TaskCard = ({ task, onDeleteOpen, onDeleteClose }) => {
  const renderDueDate = () => {
    let innerText = "No due date";
    if (task.endDate) {
      innerText = moment(task.endDate).format("MM/DD/YYYY hh:mm a");
    }
    return <Text size='xsmall'>{innerText}</Text>;
  };
  const menuItems = [
    { label: "Edit", onClick: () => {} },
    { label: "Delete Task", onClick: onDeleteOpen },
  ];
  return (
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
          <Box>
            <Text truncate>{task.name}</Text>
          </Box>
          {renderDueDate()}
        </Box>
      </Box>
      <Box direction='row' gap='small' align='center'>
        <Menu icon={<MoreVertical />} items={menuItems} hoverIndicator />
      </Box>
    </Box>
  );
};

export default TaskCard;
