import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { resetDirectoriesState } from "../../features/directories/directorySlice";
import {
  deleteAllDirectoriesThunk,
  fetchDirectoriesThunk,
} from "../../features/directories/directoryThunks";
import { deleteAllTasksThunk } from "../../features/tasks/tasksThunks";
import { resetTasksState } from "../../features/tasks/tasksSlice";
// =================================================================================

export default function DeleteAllDataDialog({
  openDeleteAllDataDialog,
  handleCloseDeleteAllDataDialog,
}) {
  const dispatch = useDispatch();
  const handleDeleteAllData = async () => {
    await dispatch(deleteAllTasksThunk());
    await dispatch(deleteAllDirectoriesThunk());
    dispatch(resetDirectoriesState());
    dispatch(resetTasksState());
    dispatch(fetchDirectoriesThunk());
    handleCloseDeleteAllDataDialog();
  };
  return (
    <Dialog
      open={openDeleteAllDataDialog}
      onClose={handleCloseDeleteAllDataDialog}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: { bgcolor: "background.paper" },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Are You Sure?
        <IconButton
          aria-label="close"
          onClick={handleCloseDeleteAllDataDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" component="p">
          All data will be deleted permanently.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleDeleteAllData}
          sx={{
            bgcolor: "primary.main",
          }}
        >
          Confirm
        </Button>
        <Button
          variant="text"
          onClick={handleCloseDeleteAllDataDialog}
          sx={{
            color: "text.secondary",
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
