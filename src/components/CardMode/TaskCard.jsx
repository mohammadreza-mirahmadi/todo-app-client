import { Box, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DataIcon from "../../assets/icons/date.svg?react";
import TaskButtons from "../Utils/TaskButtons";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectDirectoryById } from "../../features/directories/directorySelectors";
// =================================================================================

// Styles:
const taskCardStyles = {
  width: "230px",
  height: "220px",
  mt: 2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: 1,
  position: "relative",
  borderRadius: "6px",
  color: "text.secondary",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
};
const miniTitleStyles = {
  textDecoration: "none",
  fontSize: "0.7rem",
  bgcolor: "error.light",
  color: "error.dark",
  height: "25px",
  lineHeight: "25px",
  borderTopRightRadius: "6px",
  borderTopLeftRadius: "6px",
  paddingX: 1.5,
  position: "absolute",
  top: "-25px",
  right: "1rem",
  transition: "all 120ms ease-in",
};

function TaskCard({
  title,
  description,
  deadline,
  currentTaskId,
  directory,
  firstTask,
  taskId,
}) {
  const dir = useSelector((state) => selectDirectoryById(state, directory));

  return (
    <Grid
      sx={{
        ...taskCardStyles,
        bgcolor: firstTask ? "primary.main" : "background.paper",
      }}
    >
      {/* Mini Title (Directory) */}
      <Box
        sx={miniTitleStyles}
        onMouseEnter={(e) => (e.target.style.filter = "brightness(94%)")}
        onMouseLeave={(e) => (e.target.style.filter = "brightness(100%)")}
        component={Link}
        to={`/directory/${directory}`}
      >
        {dir?.name || ""}
      </Box>

      {/* wrapper of contents */}
      <Stack
        justifyContent="space-between"
        sx={{
          flexGrow: 1,
        }}
      >
        {/* content-top: title & description */}
        <Box>
          <Typography
            variant="h5"
            color={firstTask ? "secondary.main" : "text.primary"}
            component="h3"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color={firstTask ? "secondary.light" : "text.secondary"}
            sx={{
              mt: 0.6,
              whiteSpace: "normal",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* content-bottom: deadline */}
        <Typography
          component="p"
          variant="body2"
          color={firstTask ? "secondary.main" : "text.primary"}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <DataIcon width={20} />{" "}
          {new Date(deadline).toLocaleDateString("en-US")}
        </Typography>
      </Stack>

      {/* card-footer: buttons */}
      <TaskButtons
        currentTaskId={currentTaskId}
        type="card"
        firstTask={firstTask}
        taskId={taskId}
      />
    </Grid>
  );
}

export default TaskCard;
