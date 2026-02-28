import { useState } from "react";
import ViewTask1 from "../../assets/icons/view-1.svg?react";
import ViewTask2 from "../../assets/icons/view-2.svg?react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSortBy } from "../../features/tasks/tasksSlice";
// =================================================================================

function ToolBar({ toggleTasksShowMode, tasksShowMode }) {
  const dispatch = useDispatch();
  const localTasksShowMode = tasksShowMode ? "list" : "card";
  const [taskMode, setTaskMode] = useState(localTasksShowMode);
  const [sort, setSort] = useState("");

  const handleClick = (e) => {
    if (e.currentTarget.ariaLabel === "card-view" && taskMode !== "list") {
      setTaskMode("list");
      toggleTasksShowMode();
    } else if (
      e.currentTarget.ariaLabel === "list-view" &&
      taskMode === "list"
    ) {
      setTaskMode("card");
      toggleTasksShowMode();
    } else {
      null;
    }
  };
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.6,
        }}
      >
        <SvgIcon
          component={ViewTask1}
          aria-label="card-view"
          sx={{
            color: taskMode === "list" ? "primary.main" : "text.secondary",
            fontSize: { xs: "1.2rem", sm: "1.6rem" },
            "&:hover": { color: "primary.dark" },
          }}
          onClick={handleClick}
        />

        <SvgIcon
          component={ViewTask2}
          aria-label="list-view"
          sx={{
            color: taskMode === "card" ? "primary.main" : "text.secondary",
            fontSize: { xs: "1.2rem", sm: "1.6rem" },
            fill: "none",
            "&:hover": { color: "primary.dark" },
          }}
          onClick={handleClick}
        />
      </Box>

      <FormControl
        size="small"
        sx={{ width: "140px", bgcolor: "background.paper" }}
      >
        <InputLabel>Sort by</InputLabel>

        <Select
          value={sort}
          label="Sort by"
          onChange={(e) => setSort(e.target.value)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "6px",
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "background.paper",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
              borderWidth: "2px",
            },
          }}
        >
          <MenuItem value="" onClick={() => dispatch(setSortBy(null))}>
            Sort by
          </MenuItem>
          <MenuItem value="order" onClick={() => dispatch(setSortBy("order"))}>
            Order Added
          </MenuItem>
          <MenuItem
            value="earlier"
            onClick={() => dispatch(setSortBy("earlier"))}
          >
            Earlier First
          </MenuItem>
          <MenuItem value="later" onClick={() => dispatch(setSortBy("later"))}>
            Later First
          </MenuItem>
          <MenuItem
            value="completed"
            onClick={() => dispatch(setSortBy("completed"))}
          >
            Completed First
          </MenuItem>
          <MenuItem
            value="uncompleted"
            onClick={() => dispatch(setSortBy("uncompleted"))}
          >
            Uncompleted First
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default ToolBar;
