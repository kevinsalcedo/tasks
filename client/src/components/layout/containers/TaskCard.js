import React from "react";
import { connect } from "react-redux";
import { Box, CheckBox, Text, Menu } from "grommet";
import { MoreVertical } from "grommet-icons";
import moment from "moment";
import { selectTask, updateTask } from "../../../actions/list";
import {
  toggleCreateTaskForm,
  toggleDeleteTaskForm,
} from "../../../actions/dashboard";

const TaskCard = ({
  task,
  selectTask,
  updateTask,
  toggleCreateTaskForm,
  toggleDeleteTaskForm,
}) => {
  const renderDueDate = () => {
    let innerText = "No due date";
    let pastDue = false;
    if (task.endDate) {
      const now = moment().startOf("day");
      const dueDate = moment(task.endDate).startOf("day");
      const timeEnabled = task.endTimeEnabled;

      //Day comparisons for display
      if (!task.backlog) {
        const diff = dueDate.diff(now, "days");
        if (diff < 0) {
          pastDue = true;
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
    return (
      <Text size="xsmall" color={pastDue ? "status-critical" : null}>
        {innerText}
      </Text>
    );
  };

  // Mark a task as completed
  // This will also allow users to mark them as incomplete before refreshing the page
  const toggleCompleteTask = (task) => {
    let formValues = {
      completed: !task.completed,
    };
    updateTask(task._id, formValues);
  };
  // Toggles a task between the backlog and active lists
  // Toggling to active list sets the end date to today
  const toggleTaskBacklog = (task) => {
    const isBacklog = task.backlog;

    let formValues = {
      backlog: !isBacklog,
    };

    if (isBacklog) {
      formValues.endDate = moment().utc().format();
    }

    updateTask(task._id, formValues);
  };
  const menuItems = [
    {
      label: "Edit",
      onClick: () => {
        selectTask(task);
        toggleCreateTaskForm(true);
      },
    },
    {
      label: `Move to ${task.backlog ? "Active" : "Backlog"}`,
      onClick: () => {
        toggleTaskBacklog(task);
      },
    },
    {
      label: "Delete Task",
      onClick: () => {
        selectTask(task);
        toggleDeleteTaskForm(true);
      },
    },
  ];

  return (
    <Box
      direction="row"
      pad={{ horizontal: "medium", vertical: "xxsmall" }}
      background="light-1"
      elevation="small"
      gap="small"
      justify="between"
      align="center"
      flex={false}
      border={{
        color: task.taskList.color,
        side: "left",
        size: "large",
        style: "solid",
      }}
      margin={{ vertical: "5px" }}
    >
      <Box direction="row" gap="small" align="center">
        <CheckBox
          checked={task.completed}
          onClick={() => toggleCompleteTask(task)}
        />
        <Box>
          <Text truncate>{task.name}</Text>
        </Box>
      </Box>
      <Box direction="row" gap="small" align="center">
        {renderDueDate()}
        <Menu icon={<MoreVertical />} items={menuItems} hoverIndicator />
      </Box>
    </Box>
  );
};

export default connect(null, {
  selectTask,
  updateTask,
  toggleCreateTaskForm,
  toggleDeleteTaskForm,
})(TaskCard);
