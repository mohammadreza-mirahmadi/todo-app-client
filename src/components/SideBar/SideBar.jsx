import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import Directories from "./Directories";
import useIsMobile from "../../shared/hooks/useIsMobile";
import ProfileMobile from "../Profile/ProfileMobile";
import ProgressMobile from "../Profile/ProgressMobile";
import { NavLink } from "react-router";
import { useState } from "react";
import TaskFormDialog from "../Utils/TaskFormDialog";
// =================================================================================

// Styles:
const drawerStyles = {
  width: "260px",
  p: 2,
  py: 3,
  borderRight: "none",
  Height: "100vh",
  overflowY: "auto",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};
const listStyles = {
  marginX: -2,
  color: "text.secondary",
  "& .MuiListItemText-primary": {
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  "& .MuiListItemButton-root:hover": {
    color: "error.dark",
    bgcolor: "transparent",
  },
};

const listItemContents = [
  { href: "/", text: "All Tasks" },
  { href: "/important-tasks", text: "Important Tasks" },
  { href: "/completed-tasks", text: "Completed Tasks" },
  { href: "/uncompleted-tasks", text: "Uncompleted Tasks" },
];

function SideBar({ toggleDrawer, mobileOpen }) {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile("lg");

  const [openTaskFormDialog, setOpenTaskFormDialog] = useState(false);

  return (
    <Drawer
      slotProps={{
        paper: {
          sx: { ...drawerStyles, position: isMobile ? "absolute" : "fixed" },
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={toggleDrawer}
      component="aside"
    >
      {/* Sidebar List & Title */}
      <Box>
        {/* Sidebar header (title and profile in mobile) */}
        {isTablet ? (
          <ProfileMobile />
        ) : (
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
            component="h2"
          >
            TO-DO LIST
          </Typography>
        )}

        {!isTablet && (
          <Button
            variant="contained"
            onClick={() => setOpenTaskFormDialog(true)}
            sx={{ width: "100%", my: 2 }}
          >
            Add New Task
          </Button>
        )}

        {/* Routes List */}
        <List sx={listStyles} component="nav">
          {/* List Items (Routes) */}
          {listItemContents.map((listItem) => (
            <ListItemButton
              component={NavLink}
              to={listItem.href}
              key={listItem.href}
              sx={{
                "&.active": {
                  color: "error.dark",
                  bgcolor: "error.light",
                  borderRight: "4px solid",
                  borderColor: "error.dark",
                },
              }}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <ListItemText primary={listItem.text} />
            </ListItemButton>
          ))}

          <Directories />
        </List>
      </Box>

      {/* Sidebar mobile frofile */}
      {isTablet && <ProgressMobile />}

      <TaskFormDialog
        openTaskFormDialog={openTaskFormDialog}
        setOpenTaskFormDialog={setOpenTaskFormDialog}
      />
    </Drawer>
  );
}

export default SideBar;
