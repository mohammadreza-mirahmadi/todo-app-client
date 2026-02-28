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
// =================================================================================

export default function DeleteDialog({
  handleCloseDeleteDialog,
  openDeleteDialog,
  handleDeleteDirectory,
}) {
  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleCloseDeleteDialog}
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
          onClick={handleCloseDeleteDialog}
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
          This directory will be deleted permanently.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleDeleteDirectory}
          sx={{
            bgcolor: "primary.main",
          }}
        >
          Confirm
        </Button>
        <Button
          variant="text"
          onClick={handleCloseDeleteDialog}
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
