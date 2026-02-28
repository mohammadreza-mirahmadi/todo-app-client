import { Avatar, Box, Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import useToggleTheme from "../../features/theme/hooks/useToggleTheme";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { selectUser } from "../../features/auth/authSelectors";
// =================================================================================

function ProfileMobile() {
  const { mode, toggleTheme } = useToggleTheme();

  const user = useSelector(selectUser);

  return (
    <Box>
      {/* Header section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1.2}
        sx={{
          mb: 2,
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
          <PersonIcon sx={{ fontSize: 24, bgcolor: "gray.500" }} />
        </Avatar>
      </Stack>

      {/* Theme Switch Section */}
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
    </Box>
  );
}

export default ProfileMobile;
