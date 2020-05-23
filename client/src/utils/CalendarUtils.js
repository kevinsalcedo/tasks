import moment from "moment";

export const generateCalendar = (tasks, calendarStart) => {
  const calendar = {};
  const start = moment(calendarStart);
  const end = moment(calendarStart).add(3, "days").endOf("day");
  let curr = start;
  while (!curr.isAfter(end, "day")) {
    calendar[curr.startOf("day").format()] = [];
    curr = curr.add(1, "days");
  }
  tasks.forEach((task) => {
    const create = task.endDate
      ? moment(task.endDate)
      : moment(task.createDate);
    calendar[create.startOf("day").format()].push(task);
  });
  return calendar;
};

export const addToCalendar = (calendar, targetTask) => {
  const taskDateGroup = moment(targetTask.endDate).startOf("day").format();

  if (calendar.hasOwnProperty(taskDateGroup)) {
    calendar[taskDateGroup].push(targetTask);
  }
};

export const removeFromCalendar = (calendar, targetTask, isUpdate) => {
  Object.keys(calendar).map(
    (dateGroup) =>
      (calendar[dateGroup] = calendar[dateGroup].filter(
        (task) => task._id !== targetTask._id
      ))
  );

  if (isUpdate && !targetTask.backlog) {
    addToCalendar(calendar, targetTask);
  }
};

export const updateCalendar = (calendar, targetTask) => {
  const taskDateGroup = moment(targetTask.endDate).startOf("day").format();

  if (calendar.hasOwnProperty(taskDateGroup)) {
    calendar[taskDateGroup].find(
      (task) => task._id === targetTask._id
    ).completed = targetTask.completed;
  }
};
