import { Box } from "@mui/material";
import TaskList from "./TaskList";
import AddTaskList from "./AddTaskList";
// =================================================================================

function ShowTaskList({ tasks }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 5, pb: 6 }}
    >
      {/* first task (with different style) */}
      {tasks?.length >= 1 && (
        <TaskList
          key={tasks[0]._id}
          taskId={tasks[0]._id}
          firstTask={true}
          title={tasks[0].title}
          description={tasks[0].description}
          deadline={tasks[0].deadline}
          directory={tasks[0].dirId}
          currentTaskId={tasks[0]._id}
        />
      )}

      {/* other tasks */}
      {tasks?.length > 1 &&
        tasks
          .slice(1)
          .map((task) => (
            <TaskList
              key={task._id}
              taskId={task._id}
              firstTask={false}
              title={task.title}
              description={task.description}
              deadline={task.deadline}
              directory={task.dirId}
              currentTaskId={task._id}
            />
          ))}
      <AddTaskList />
    </Box>
  );
}

export default ShowTaskList;
