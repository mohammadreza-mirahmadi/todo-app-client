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

export default function EditDialog({
  handleCloseEditDialog,
  openEditDialog,
  handleEditDirectory,
  inputValue,
  setInputValue,
}) {
  return (
    <Dialog
      open={openEditDialog}
      onClose={handleCloseEditDialog}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: { bgcolor: "background.paper" },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Edit Directory Name
        <IconButton
          aria-label="close"
          onClick={handleCloseEditDialog}
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
          onClick={handleEditDirectory}
          sx={{
            bgcolor: "primary.main",
          }}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
