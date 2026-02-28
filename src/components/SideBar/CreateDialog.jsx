import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// =================================================================================

export default function CreateDialog({
  handleCloseCreateDialog,
  openCreateDialog,
  handleCreateDirectory,
  inputValue,
  setInputValue,
}) {
  return (
    <Dialog
      open={openCreateDialog}
      onClose={handleCloseCreateDialog}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: { bgcolor: "background.paper" },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Create New Directory
        <IconButton
          aria-label="close"
          onClick={handleCloseCreateDialog}
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
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          slotProps={{
            input: {
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                  borderWidth: 2,
                },
              },
            },
            root: {
              sx: {
                mt: 2,
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleCreateDirectory}
          sx={{
            bgcolor: "primary.main",
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
