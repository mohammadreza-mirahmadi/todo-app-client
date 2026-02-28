import { Box, Typography } from "@mui/material";
import DataIcon from "../../assets/icons/date.svg?react";
import TaskButtons from "../Utils/TaskButtons";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectDirectoryById } from "../../features/directories/directorySelectors";
// =================================================================================

// Styles:
const TaskListStyles = {
  display: "flex",
  height: "120px",
  alignItems: "center",
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
  fontSize: { xs: "0.7rem", ms: "0.8rem" },
  bgcolor: "error.light",
  color: "error.dark",
  height: { xs: "25px", sm: "30px" },
  lineHeight: { xs: "25px", sm: "30px" },
  borderTopRightRadius: "6px",
  borderTopLeftRadius: "6px",
  paddingX: 1.5,
  position: "absolute",
  top: { xs: "-25px", sm: "-30px" },
  right: "2rem",
  transition: "all 120ms ease-in",
};

function TaskList({
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
    <Box
      sx={{
        ...TaskListStyles,
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
      <Box>
        {/* title */}
        <Typography
          variant="h5"
          color={firstTask ? "secondary.main" : "text.primary"}
          component="h3"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          {title}
        </Typography>

        {/* description */}
        <Typography
          variant="body1"
          component="p"
          color={firstTask ? "secondary.light" : "text.secondary"}
          sx={{
            mb: 2,
            mt: 0.6,
            fontSize: { xs: "0.6rem", sm: "0.8rem" },
            whiteSpace: "normal",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {description}
        </Typography>

        {/* deadline */}
        <Typography
          component="p"
          variant="body2"
          color={firstTask ? "secondary.main" : "text.secondary"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: { xs: "0.5rem", sm: "0.7rem" },
          }}
        >
          <DataIcon width={20} />{" "}
          {new Date(deadline).toLocaleDateString("en-US")}
        </Typography>
      </Box>

      {/* right-section: buttons */}
      <TaskButtons
        currentTaskId={currentTaskId}
        type="list"
        firstTask={firstTask}
        taskId={taskId}
      />
    </Box>
  );
}

export default TaskList;
