import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ToolBar from "../../../components/Utils/ToolBar";
import ShowTaskList from "../../../components/LIstMode/ShowTaskList";
import ShowTaskCards from "../../../components/CardMode/ShowTaskCards";
import { useOutletContext } from "react-router-dom";
import { selectAllTasks } from "../../tasks/tasksSelectors";
import { selectDirectoryById } from "../directorySelectors";
// =================================================================================

function DirectoriesPage() {
  const { tasksShowMode, toggleTasksShowMode } = useOutletContext(); // getting props from outlet context

  // This is a dynamic route. So it must be determined which route is it in by using the route ID.
  const { id: directoryId } = useParams();
  const directory = useSelector((state) =>
    selectDirectoryById(state, directoryId),
  );
  const allTasks = useSelector(selectAllTasks); // get all tasks

  const filterdTasks = allTasks.filter(
    (task) => String(task.dirId) === String(directoryId),
  );
  const numberOfTasks = filterdTasks.length;
  const nameOfDirectory = directory?.name || directoryId;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h1" component="h2">
        {nameOfDirectory} Tasks (
        {numberOfTasks <= 1 && numberOfTasks >= 0
          ? `${numberOfTasks} Task`
          : numberOfTasks > 1
            ? `${numberOfTasks} Tasks`
            : "0 Task"}
        )
      </Typography>
      <ToolBar
        toggleTasksShowMode={toggleTasksShowMode}
        tasksShowMode={tasksShowMode}
      />
      {tasksShowMode ? (
        <ShowTaskList tasks={filterdTasks} />
      ) : (
        <ShowTaskCards tasks={filterdTasks} />
      )}
    </Box>
  );
}

export default DirectoriesPage;
