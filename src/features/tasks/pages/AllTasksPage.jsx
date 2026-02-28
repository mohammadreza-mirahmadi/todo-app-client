import { Box, Typography } from "@mui/material";
import ToolBar from "../../../components/Utils/ToolBar";
import ShowTaskList from "../../../components/LIstMode/ShowTaskList";
import ShowTaskCards from "../../../components/CardMode/ShowTaskCards";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { selectAllTasks, selectTasksSortBy } from "../tasksSelectors";
// =================================================================================

function AllTasksPage() {
  const { tasksShowMode, toggleTasksShowMode } = useOutletContext(); // getting props from outlet context

  const allTasks = useSelector(selectAllTasks);
  const sortBy = useSelector(selectTasksSortBy);
  const numTask = allTasks.length;
  const nameTask = "All";
  let taskList = [];

  switch (sortBy) {
    case "earlier":
      taskList = [...allTasks].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline),
      );
      break;
    case "later":
      taskList = [...allTasks].sort(
        (a, b) => new Date(b.deadline) - new Date(a.deadline),
      );
      break;
    case "completed":
      taskList = [...allTasks].sort((a, b) => b.completed - a.completed);
      break;
    case "uncompleted":
      taskList = [...allTasks].sort((a, b) => a.completed - b.completed);
      break;
    case "order":
      taskList = [...allTasks].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      break;
    default:
      taskList = allTasks;
      break;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h1" component="h2">
        {nameTask} Tasks (
        {numTask <= 1 && numTask >= 0
          ? `${numTask} Task`
          : numTask > 1
            ? `${numTask} Tasks`
            : "0 Task"}
        )
      </Typography>
      <ToolBar
        toggleTasksShowMode={toggleTasksShowMode}
        tasksShowMode={tasksShowMode}
      />
      {tasksShowMode ? (
        <ShowTaskList tasks={taskList} />
      ) : (
        <ShowTaskCards tasks={taskList} />
      )}
    </Box>
  );
}

export default AllTasksPage;
