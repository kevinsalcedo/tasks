import React from "react";
import { Box, Button, CheckBox, Text, Menu } from "grommet";
import { MoreVertical } from "grommet-icons";
import moment from "moment";

const TaskCard = ({ task, ...rest }) => {
  const renderDueDate = () => {
    let innerText = "No due date";
    if (task.endDate) {
      innerText = moment(task.endDate).format();
    }
    return <Text size='xsmall'>{innerText}</Text>;
  };
  const menuItems = [
    { label: "Edit", onClick: () => {} },
    { label: "Delete Task", onClick: () => {} },
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
      {...rest}
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
