import { InputAdornment, SvgIcon, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "../../assets/icons/search.svg?react";
// Redux
import { setLastRoute } from "../../features/navigations/navigationSlice";
import { setSearchQuery } from "../../features/tasks/tasksSlice";
import { selectTasksSearchQuery } from "../../features/tasks/tasksSelectors";
import { store } from "../../app/store";
// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
// =================================================================================

function SearchBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = useSelector(selectTasksSearchQuery);

  const handleChange = (e) => {
    const query = e.target.value;

    dispatch(setSearchQuery(query));

    if (query.trim() !== "" && searchQuery === "") {
      dispatch(setLastRoute(location.pathname));
    }

    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
    } else {
      const lastRoute = store.getState().navigation.lastRoute;
      navigate(lastRoute);
    }
  };

  return (
    <Box
      sx={{ width: { xs: "100%", md: "25%" }, marginTop: { xs: 1.5, md: 0 } }}
    >
      <TextField
        placeholder="Search task"
        variant="outlined"
        value={searchQuery}
        onChange={handleChange}
        fullWidth
        slotProps={{
          // Styles of input
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SvgIcon
                  component={SearchIcon}
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.2rem",
                    fill: "none",
                  }}
                />
              </InputAdornment>
            ),
            sx: {
              height: "40px",
              pr: 1,
              fontSize: "0.8rem",
              color: "text.primary",
            },
          },

          // Styles of input's parent (root)
          root: {
            sx: {
              Width: "250px",
              bgcolor: "background.paper",
              borderRadius: "6px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "background.paper",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "primary.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "primary.main",
              },
            },
          },
        }}
      />
    </Box>
  );
}

export default SearchBox;
