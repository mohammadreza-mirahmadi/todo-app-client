import { Container, Box } from "@mui/material";
import ProfilePanel from "../components/Profile/ProfilePanel";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasksThunk } from "../features/tasks/tasksThunks";
import { fetchDirectoriesThunk } from "../features/directories/directoryThunks";
// =================================================================================

function AppLayout() {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // Tasks show mode:
  const getInitialTasksShowMode = () => {
    const value = localStorage.getItem("tasksShowMode");
    return value === "true";
  };
  const [tasksShowMode, setTasksShowMode] = useState(getInitialTasksShowMode);
  const toggleTasksShowMode = () => {
    setTasksShowMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("tasksShowMode", newValue);
      return newValue;
    });
  };
  // props for pages(routes) passed via outlet context
  const outletContext = {
    toggleTasksShowMode,
    tasksShowMode,
  };

  useEffect(() => {
    dispatch(fetchTasksThunk());
    dispatch(fetchDirectoriesThunk());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <SideBar toggleDrawer={toggleDrawer} mobileOpen={mobileOpen} />
      <Box sx={{ width: { xs: 0, md: "260px" }, flexShrink: 0 }}></Box>
      {/* برای رزرو جای سایدبار. چون پوزیشن فیکسد داده شده، پس نیازه تا جاش رزرو بشه */}

      <Container>
        <Header toggleDrawer={toggleDrawer} />
        <Outlet context={outletContext} />
      </Container>

      <ProfilePanel />
    </Box>
  );
}

export default AppLayout;
