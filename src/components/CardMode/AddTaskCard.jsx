import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import TaskFormDialog from "../Utils/TaskFormDialog";
import { useState } from "react";
// =================================================================================

function AddTaskCard() {
  const [openTaskFormDialog, setOpenTaskFormDialog] = useState(false);
  return (
    <>
      <Stack
        component="div"
        justifyContent="center"
        alignItems="center"
        onClick={() => setOpenTaskFormDialog(true)}
        sx={{
          cursor: "pointer",
          width: "230px",
          height: "220px",
          mt: 2,
          border: "2px dashed",
          borderColor: "text.secondary",
          borderRadius: "6px",
          color: "text.secondary",
          transition: "all 150ms ease-in",
          "&:hover": {
            bgcolor: "text.secondary",
            color: "text.primary",
          },
        }}
      >
        <Typography variant="h5" component="p">
          Add New Task
        </Typography>
      </Stack>
      <TaskFormDialog
        openTaskFormDialog={openTaskFormDialog}
        setOpenTaskFormDialog={setOpenTaskFormDialog}
      />
    </>
  );
}

export default AddTaskCard;
