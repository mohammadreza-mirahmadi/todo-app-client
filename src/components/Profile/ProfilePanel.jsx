import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  Switch,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import DeleteAllDataDialog from "../Utils/DeleteAllDataDialog";
import PersonIcon from "@mui/icons-material/Person";
// Hooks
import useToggleTheme from "../../features/theme/hooks/useToggleTheme";
import { useSelector } from "react-redux";
import { useState } from "react";
// Redux
import { selectAllTasks } from "../../features/tasks/tasksSelectors";
import { selectUser } from "../../features/auth/authSelectors";
import { Link } from "react-router-dom";
// =================================================================================

// Styles:
const profileBarStyles = {
  display: { xs: "none", lg: "flex" },
  flexDirection: "column",
  justifyContent: "space-between",
  position: "fixed",
  right: "0",
  width: "260px",
  height: "100vh",
  bgcolor: "background.paper",
  px: 2,
  pb: 2,
};

function ProfilePanel() {
  const user = useSelector(selectUser);
  const { toggleTheme, mode } = useToggleTheme();
  const tasks = useSelector(selectAllTasks);

  const totalTasks = tasks.length;
  let completedTasks = 0;
  tasks.forEach((task) => task.completed && completedTasks++);
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const [openDeleteAllDataDialog, setOpenDeleteAllDataDialog] = useState(false);
  const handleCloseDeleteAllDataDialog = () =>
    setOpenDeleteAllDataDialog(false);

  return (
    // Panel profile spacer to reserve the panel's place on the screen when the panel is in a fixed position
    <Box sx={{ width: { xs: 0, lg: "260px" }, flexShrink: 0 }}>
      {/* Profile Panel */}
      <Box sx={profileBarStyles} component="aside">
        {/* wrapper: contents-top */}
        <Box>
          {/* section: header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1.2}
            sx={{
              my: 2,
            }}
          >
            <Typography variant="h6" component="h2">
              Hi, {user?.username || "User"}
            </Typography>
            <Avatar
              src={user?.avatar || undefined}
              alt="User Profile"
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: "gray.300",
              }}
            >
              {!user?.avatar && (
                <PersonIcon sx={{ fontSize: 24, bgcolor: "gray.500" }} />
              )}
            </Avatar>
          </Stack>

          {/* section: theme switch */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <Typography variant="h6" color="text.secondary" component="p">
              {mode === "dark" ? "Darkmode" : "Lightmode"}
            </Typography>
            <Switch
              checked={mode === "light" ? true : false}
              onChange={() => toggleTheme()}
              color="primary"
            />
          </Stack>

          {/* section: progress */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 2, mb: 1.5 }}
            >
              <Typography
                variant="subtitle2"
                color="text.primary"
                component="h3"
              >
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
        </Box>

        {/* section: footer */}
        <Box>
          <Button
            variant="text"
            color="text.secondary"
            onClick={() => {
              setOpenDeleteAllDataDialog(true);
            }}
          >
            Delete All Data
          </Button>
          <Button
            component={Link}
            to="/profile"
            variant="contained"
            sx={{
              bgcolor: "error.light",
              color: "error.dark",
              width: "100%",
              mt: 1,
            }}
          >
            Profile
          </Button>
        </Box>
      </Box>

      <DeleteAllDataDialog
        openDeleteAllDataDialog={openDeleteAllDataDialog}
        handleCloseDeleteAllDataDialog={handleCloseDeleteAllDataDialog}
      />
    </Box>
  );
}

export default ProfilePanel;
