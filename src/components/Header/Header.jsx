import { Box, IconButton, Typography, Button, SvgIcon } from "@mui/material";
import { Stack } from "@mui/system";
import MenuIcon from "../../assets/icons/menu.svg?react";
import SearchBox from "./SearchBox";
import TaskFormDialog from "../Utils/TaskFormDialog";
import useIsMobile from "../../shared/hooks/useIsMobile";
import { Link } from "react-router";
import { useState } from "react";
// =================================================================================

const date = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const headerStyles = {
  flexGrow: 1,
  pt: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap-reverse",
};

function Header({ toggleDrawer }) {
  const isMobile = useIsMobile();
  const [openTaskFormDialog, setOpenTaskFormDialog] = useState(false);

  return (
    <Box component="header" sx={headerStyles}>
      <SearchBox />

      {/* wrapper of contents */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: { xs: "100%", md: "50%" },
        }}
      >
        {/* Hamburger Menu Icon */}
        {isMobile && (
          <IconButton
            sx={{ bgcolor: "background.paper", ml: 0 }}
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
          >
            <SvgIcon component={MenuIcon} />
          </IconButton>
        )}

        {/* Header text wrapper */}
        <Box>
          <Typography
            variant="h2"
            component={Link}
            to="/"
            sx={{
              display: { xs: "block", lg: "none" },
              textDecoration: "none",
            }}
          >
            TO-DO LIST
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="h2"
            align="center"
          >
            {date.getFullYear()}, {months[date.getMonth()]} {date.getDate()}
          </Typography>
        </Box>

        {/* Header button wrapper (Button spacer when it is in a fixed position) */}
        <Box sx={{ width: { xs: "114px", md: "auto" } }}>
          <Button
            variant="contained"
            onClick={() => setOpenTaskFormDialog(true)}
            sx={{
              position: { xs: "fixed", md: "static" },
              bottom: "1.4rem",
              right: "1.4rem",
              zIndex: 999,
            }}
          >
            Add new task
          </Button>
        </Box>
      </Stack>

      <TaskFormDialog
        openTaskFormDialog={openTaskFormDialog}
        setOpenTaskFormDialog={setOpenTaskFormDialog}
      />
    </Box>
  );
}

export default Header;
