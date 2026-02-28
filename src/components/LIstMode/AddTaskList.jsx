import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import TaskFormDialog from "../Utils/TaskFormDialog";
import { useState } from "react";
// =================================================================================

function AddTaskList() {
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
          height: "120px",
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

export default AddTaskList;
