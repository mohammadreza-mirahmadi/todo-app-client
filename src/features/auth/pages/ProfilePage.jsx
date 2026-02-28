import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../authSelectors";
import { logoutThunk } from "../authThunks";
import EditDialog from "../components/EditDialog";
// =================================================================================

function ProfilePage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [editField, setEditField] = useState(null);

  const handleEdit = (field) => {
    setEditField(field);
    setOpenDialog(true);
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  const fields = [
    { key: "username", label: "Username", value: user?.username },
    { key: "email", label: "Email", value: user?.email },
    { key: "password", label: "Password", value: "••••••••" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "480px",
          bgcolor: "background.paper",
          borderRadius: "8px",
          p: 4,
          boxShadow: "rgba(0,0,0,0.08) 0px 4px 24px",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography variant="h2" component="h1" color="text.primary">
            Profile
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        </Stack>

        {/* Avatar */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              src={user?.avatar || undefined}
              alt={user?.username}
              sx={{ width: 64, height: 64, bgcolor: "grey.300" }}
            >
              {!user?.avatar && (
                <PersonIcon sx={{ fontSize: 40, color: "grey.500" }} />
              )}
            </Avatar>
            <Box>
              <Typography variant="h5" color="text.primary">
                {user?.username}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Stack>
          <IconButton
            onClick={() => handleEdit("avatar")}
            sx={{
              bgcolor: "primary.light",
              color: "primary.main",
              "&:hover": {
                bgcolor: "primary.light",
                filter: "brightness(0.92)",
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "background.default",
            mb: 3,
          }}
        />

        <Stack spacing={2}>
          {fields.map(({ key, label, value }) => (
            <Stack
              key={key}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                bgcolor: "background.default",
                borderRadius: "6px",
                px: 2,
                py: 1.5,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.3 }}
                >
                  {label}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {value}
                </Typography>
              </Box>
              <IconButton
                onClick={() => handleEdit(key)}
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>

      {editField && (
        <EditDialog
          key={editField}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          field={editField}
          user={user}
        />
      )}
    </Box>
  );
}

export default ProfilePage;
