import { Button, LinearProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetDirectoriesState } from "../../features/directories/directorySlice";
import { resetTasksState } from "../../features/tasks/tasksSlice";
import { selectAllTasks } from "../../features/tasks/tasksSelectors";
import {
  deleteAllDirectoriesThunk,
  fetchDirectoriesThunk,
} from "../../features/directories/directoryThunks";
import { deleteAllTasksThunk } from "../../features/tasks/tasksThunks";
import TaskFormDialog from "../Utils/TaskFormDialog";
import { Link } from "react-router-dom";
// =================================================================================

function ProgressMobile() {
  const dispatch = useDispatch();

  const [openTaskFormDialog, setOpenTaskFormDialog] = useState(false);

  const tasks = useSelector(selectAllTasks);
  const totalTasks = tasks.length;
  let completedTasks = 0;
  tasks.forEach((task) => task.completed && completedTasks++);
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <Box sx={{ height: "175px", mt: 2 }}>
      {/* Progress sectoin */}
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <Typography variant="subtitle2" color="text.primary" component="h3">
            All Tasks
          </Typography>

          <Typography variant="body1" component="p">
            {completedTasks}/{totalTasks}
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: "8px",
            borderRadius: "6px",
          }}
        />
      </Box>

      {/* Bottom buttons */}
      <Button
        variant="text"
        color="text.primary"
        sx={{ my: 1 }}
        onClick={async () => {
          await dispatch(deleteAllDirectoriesThunk());
          await dispatch(deleteAllTasksThunk());
          dispatch(resetDirectoriesState());
          dispatch(resetTasksState());
          dispatch(fetchDirectoriesThunk());
        }}
      >
        Delete All Data
      </Button>

      <Button
        variant="contained"
        sx={{ width: "100%", mb: 1 }}
        onClick={() => setOpenTaskFormDialog(true)}
      >
        Add New Task
      </Button>

      <Button
        component={Link}
        to="/profile"
        variant="contained"
        sx={{
          color: "error.dark",
          bgcolor: "error.light",
          width: "100%",
        }}
      >
        Profile
      </Button>

      <TaskFormDialog
        openTaskFormDialog={openTaskFormDialog}
        setOpenTaskFormDialog={setOpenTaskFormDialog}
      />
    </Box>
  );
}

export default ProgressMobile;
