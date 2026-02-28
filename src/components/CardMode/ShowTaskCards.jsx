import { Grid } from "@mui/material";
import TaskCard from "./TaskCard";
import AddTaskCard from "./AddTaskCard";
// =================================================================================

function ShowTaskCards({ tasks }) {
  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 1, md: 3, lg: 4 }}
      sx={{
        justifyContent: { xs: "center", sm: "start" },
        mt: 2,
        pb: 6,
      }}
    >
      {/* first card (with different style) */}
      {tasks?.length >= 1 && (
        <TaskCard
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

      {/* other cards */}
      {tasks?.length > 1 &&
        tasks
          .slice(1)
          .map((task) => (
            <TaskCard
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
      <AddTaskCard />
    </Grid>
  );
}

export default ShowTaskCards;
