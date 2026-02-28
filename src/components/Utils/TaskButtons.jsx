// Icons
import TrashIcon from "../../assets/icons/trash.svg?react";
import OptionsIcon from "../../assets/icons/options.svg?react";
import StarIcon from "../../assets/icons/star-line.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import CloseIcon from "../../assets/icons/x.svg?react";
// Hooks
import useIsMobile from "../../shared/hooks/useIsMobile";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Redux
import {
  deleteTaskThunk,
  toggleCompletedThunk,
  toggleImportantThunk,
} from "../../features/tasks/tasksThunks";
import { selectAllTasks } from "../../features/tasks/tasksSelectors";
// MUI
import { Box, Stack } from "@mui/system";
import { Button, IconButton, SvgIcon } from "@mui/material";
// Dialogs
import DeleteTaskDialog from "./DeleteTaskDialog";
import TaskFormDialog from "./TaskFormDialog";
// =================================================================================

function TaskButtons({ currentTaskId, type, firstTask, taskId }) {
  const [openTaskFormDialog, setOpenTaskFormDialog] = useState(false);

  // redux:
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks);
  const currentTask = allTasks.find((task) => task._id === currentTaskId);
  if (!currentTask) return null;
  const isImportant = currentTask.important;
  const isCompleted = currentTask.completed;

  // other hooks:
  const isMobile = useIsMobile();
  const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);

  // Toggle Functions:
  const handleClickComplete = () => {
    dispatch(toggleCompletedThunk({ id: currentTaskId, isCompleted }));
  };
  const handleClickImportant = () => {
    dispatch(toggleImportantThunk({ id: currentTaskId, isImportant }));
  };

  // Delete Task functions:
  const handleDeleteTaskDialog = () => setOpenDeleteTaskDialog(true);
  const handleCloseDeleteTaskDialog = () => setOpenDeleteTaskDialog(false);
  const handleDeleteTask = () => {
    dispatch(deleteTaskThunk(currentTaskId));
    setOpenDeleteTaskDialog(false);
  };

  // Styles
  const cardStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "2px dashed",
    borderColor: "text.secondary",
    mt: 1.6,
    pt: 1,
  };
  const listStyles = {
    display: "flex",
    alignItems: "center",
    gap: 2,
  };

  return (
    <>
      <Box sx={type === "card" ? cardStyles : listStyles}>
        {/* Handle Completed Button */}
        {isMobile && isCompleted ? (
          <IconButton
            onClick={handleClickComplete}
            sx={{
              bgcolor: "success.light",
              color: "success.dark",
              "&:hover": {
                bgcolor: "success.main",
              },
            }}
          >
            <SvgIcon
              component={CheckIcon}
              inheritViewBox
              sx={{ fontSize: "0.8rem", fill: "none" }}
            />
          </IconButton>
        ) : isMobile && !isCompleted ? (
          <IconButton
            onClick={handleClickComplete}
            sx={{
              bgcolor: "warning.light",
              color: "warning.dark",
              "&:hover": {
                bgcolor: "warning.main",
              },
            }}
          >
            <SvgIcon component={CloseIcon} sx={{ fontSize: "0.8rem" }} />
          </IconButton>
        ) : isCompleted ? (
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              paddingY: 0.2,
              bgcolor: "success.light",
              color: "success.dark",
              fontSize: "0.7rem",
            }}
            onClick={handleClickComplete}
          >
            Completed
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              paddingY: 0.2,
              bgcolor: "warning.light",
              color: "warning.dark",
              fontSize: "0.7rem",
            }}
            onClick={handleClickComplete}
          >
            Uncompleted
          </Button>
        )}

        {/* Mini Buttons */}
        <Stack direction={"row"} alignItems={"center"} gap={0.5}>
          {isImportant ? (
            <SvgIcon
              component={StarIcon}
              onClick={handleClickImportant}
              inheritViewBox
              sx={{
                cursor: "pointer",
                color: "error.main",
                fontSize: { xs: "0.8rem", sm: "1.1rem" },
              }}
            />
          ) : (
            <SvgIcon
              component={StarIcon}
              onClick={handleClickImportant}
              sx={{
                cursor: "pointer",
                fill: "none",
                color: firstTask ? "secondary.main" : "text.primary",
                fontSize: { xs: "0.8rem", sm: "1.1rem" },
              }}
            />
          )}

          <SvgIcon
            onClick={handleDeleteTaskDialog}
            component={TrashIcon}
            sx={{
              cursor: "pointer",
              color: firstTask ? "secondary.main" : "text.primary",
              fontSize: { xs: "0.8rem", sm: "1.1rem" },
            }}
          />

          <SvgIcon
            component={OptionsIcon}
            inheritViewBox
            onClick={() => setOpenTaskFormDialog(true)}
            sx={{
              cursor: "pointer",
              color: firstTask ? "secondary.main" : "text.primary",
              fontSize: { xs: "0.8rem", sm: "1.1rem" },
            }}
          />
        </Stack>
      </Box>

      {/* Dialogs */}
      <DeleteTaskDialog
        openDeleteTaskDialog={openDeleteTaskDialog}
        handleCloseDeleteTaskDialog={handleCloseDeleteTaskDialog}
        handleDeleteTask={handleDeleteTask}
      />
      <TaskFormDialog
        openTaskFormDialog={openTaskFormDialog}
        setOpenTaskFormDialog={setOpenTaskFormDialog}
        taskId={taskId}
      />
    </>
  );
}

export default TaskButtons;
