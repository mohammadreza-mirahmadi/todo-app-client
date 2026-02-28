import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  createTaskThunk,
  updateTaskThunk,
} from "../../features/tasks/tasksThunks";
import { selectAllTasks } from "../../features/tasks/tasksSelectors";
import {
  selectAllDirectories,
  selectDefaultDirectory,
} from "../../features/directories/directorySelectors";
import { useEffect } from "react";
// =================================================================================

function TaskFormDialog({ openTaskFormDialog, setOpenTaskFormDialog, taskId }) {
  const dispatch = useDispatch();
  const directoryList = useSelector(selectAllDirectories);
  const defaultDirectory = useSelector(selectDefaultDirectory);
  const tasks = useSelector(selectAllTasks);
  let currentTaskValues = {};

  // taskId => Edit Task | !taskId => Create New Task
  if (taskId) {
    const currentTask = tasks.find((task) => task._id === taskId);
    currentTaskValues = {
      ...currentTask,
      deadline: dayjs(currentTask.deadline),
    };
  } else {
    currentTaskValues = {
      title: "",
      deadline: null,
      description: "",
      dirId: defaultDirectory?._id || directoryList[0]?._id || "",
      important: false,
      completed: false,
    };
  }

  // react-hook-form configs:
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: currentTaskValues,
  });

  useEffect(() => {
    if (openTaskFormDialog && !taskId && defaultDirectory?._id) {
      setValue("dirId", defaultDirectory._id);
    }
  }, [openTaskFormDialog, taskId, defaultDirectory?._id, setValue]);

  const mySubmit = (data) => {
    const payload = { ...data, deadline: data.deadline.toISOString() };
    if (taskId) {
      dispatch(updateTaskThunk({ id: taskId, taskData: payload }));
    } else {
      dispatch(createTaskThunk(payload));
    }
    reset();
    setOpenTaskFormDialog(false);
  };

  return (
    <Dialog
      open={openTaskFormDialog}
      onClose={() => setOpenTaskFormDialog(false)}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: { bgcolor: "background.default" },
        },
      }}
    >
      <DialogTitle>
        {taskId ? "Edit Task" : "Add a Task"}
        <IconButton
          aria-label="close"
          onClick={() => setOpenTaskFormDialog(false)}
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
        <form onSubmit={handleSubmit(mySubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Task title is required!",
              },
              minLength: {
                value: 3,
                message: "Use at least three characters.",
              },
              maxLength: {
                value: 20,
                message: "No more than 20 characters are allowed.",
              },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel
                  htmlFor="title"
                  sx={{ fontSize: "1rem", color: "text.primary" }}
                >
                  Title
                </FormLabel>
                <TextField
                  id="title"
                  error={!!fieldState.error}
                  {...field}
                  placeholder="e.g. study for the test"
                  slotProps={{
                    input: {
                      sx: {
                        bgcolor: "background.paper",
                        maxHeight: "40px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderWidth: 2,
                        },
                      },
                    },
                  }}
                />

                {fieldState.error && (
                  <FormHelperText
                    error
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="deadline"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Deadline is required!",
                },
              }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <FormLabel
                    htmlFor="deadline"
                    sx={{ fontSize: "1rem", color: "text.primary" }}
                  >
                    Deadline
                  </FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    sx={{
                      "& .MuiPickersInputBase-root": {
                        maxHeight: "40px",
                        bgcolor: "background.paper",
                      },

                      // styles of border:
                      "& .MuiPickersOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                      },
                      "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                        borderWidth: "2px",
                      },
                      "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
                        borderWidth: "2px",
                      },
                    }}
                    slotProps={{
                      textField: {
                        id: "deadline",
                      },
                    }}
                  />

                  {fieldState.error && (
                    <FormHelperText
                      error
                      sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                    >
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </LocalizationProvider>

          <Controller
            name="description"
            control={control}
            rules={{
              minLength: {
                value: 3,
                message: "Use at least three characters.",
              },
              maxLength: {
                value: 200,
                message: "No more than 200 characters are allowed.",
              },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth sx={{ my: 2 }}>
                <FormLabel
                  htmlFor="description"
                  sx={{ fontSize: "1rem", color: "text.primary" }}
                >
                  Description (optional)
                </FormLabel>
                <TextField
                  id="description"
                  {...field}
                  placeholder="e.g. study for the test"
                  multiline
                  rows={3}
                  fullWidth
                  slotProps={{
                    input: {
                      sx: {
                        bgcolor: "background.paper",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                      },
                    },
                  }}
                />

                {fieldState.error && (
                  <FormHelperText
                    error
                    sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="dirId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "You must select a directory.",
              },
            }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth>
                <FormLabel
                  htmlFor="directory-input"
                  sx={{
                    fontSize: "1rem",
                    color: "text.primary",
                    "&.Mui-focused": { color: "text.primary" },
                  }}
                >
                  Select a directory
                </FormLabel>
                <Select
                  {...field}
                  id="directory"
                  sx={{
                    maxHeight: "40px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px",
                    },
                  }}
                  slotProps={{
                    root: {
                      sx: {
                        bgcolor: "background.paper",
                      },
                    },
                  }}
                >
                  {directoryList.map((directory) => (
                    <MenuItem key={directory._id} value={directory._id}>
                      {directory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="important"
            control={control}
            render={({ field, fieldState }) => (
              <FormControlLabel
                label="Mark as important"
                control={
                  <Checkbox checked={field.value} onChange={field.onChange} />
                }
              />
            )}
          />
          <br />
          <Controller
            name="completed"
            control={control}
            render={({ field, fieldState }) => (
              <FormControlLabel
                label="Mark as completed"
                control={
                  <Checkbox checked={field.value} onChange={field.onChange} />
                }
              />
            )}
          />

          <Button variant="contained" type="submit" fullWidth>
            Add to Tasks
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskFormDialog;
