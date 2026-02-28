import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "../../assets/icons/x.svg?react";
// =================================================================================

export default function DeleteTaskDialog({
  openDeleteTaskDialog,
  handleDeleteTask,
  handleCloseDeleteTaskDialog,
}) {
  return (
    <Dialog
      open={openDeleteTaskDialog}
      onClose={handleCloseDeleteTaskDialog}
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
          onClick={handleCloseDeleteTaskDialog}
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
          This task will be deleted permanently.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleDeleteTask}
          sx={{
            bgcolor: "primary.main",
          }}
        >
          Confirm
        </Button>
        <Button
          variant="text"
          onClick={handleCloseDeleteTaskDialog}
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
