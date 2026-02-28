import { Box, Typography } from "@mui/material";
import ToolBar from "../../../components/Utils/ToolBar";
import ShowTaskList from "../../../components/LIstMode/ShowTaskList";
import ShowTaskCards from "../../../components/CardMode/ShowTaskCards";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { selectAllTasks } from "../tasksSelectors";
// =================================================================================

function ImportantPage() {
  const { tasksShowMode, toggleTasksShowMode } = useOutletContext(); // getting props from outlet context

  const allTasks = useSelector(selectAllTasks);
  const importantTasks = allTasks.filter((task) => task.important);
  const numTask = importantTasks.length;
  const nameTask = "Important";

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
        <ShowTaskList tasks={importantTasks} />
      ) : (
        <ShowTaskCards tasks={importantTasks} />
      )}
    </Box>
  );
}

export default ImportantPage;
