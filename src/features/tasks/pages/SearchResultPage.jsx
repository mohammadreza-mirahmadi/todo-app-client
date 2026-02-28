import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import ToolBar from "../../../components/Utils/ToolBar";
import ShowTaskList from "../../../components/LIstMode/ShowTaskList";
import ShowTaskCards from "../../../components/CardMode/ShowTaskCards";
import { useOutletContext } from "react-router-dom";
import { selectAllTasks, selectTasksSearchQuery } from "../tasksSelectors";
// =================================================================================

function SearchResultPage() {
  const { tasksShowMode, toggleTasksShowMode } = useOutletContext(); // getting props from outlet context

  const searchQuery = useSelector(selectTasksSearchQuery).toLowerCase();
  const allTasks = useSelector(selectAllTasks);
  const resultSearch = allTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery),
  );
  const numTask = resultSearch.length;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h1" component="h2">
        Result for "{searchQuery}" (
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
        <ShowTaskList tasks={resultSearch} />
      ) : (
        <ShowTaskCards tasks={resultSearch} />
      )}
    </Box>
  );
}

export default SearchResultPage;
