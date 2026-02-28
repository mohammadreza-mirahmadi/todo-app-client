import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../ui/AppLayout";

import AllTasksPage from "../features/tasks/pages/AllTasksPage";
import CompletedPage from "../features/tasks/pages/CompletedPage";
import UncompletedPage from "../features/tasks/pages/UncompletedPage";
import ImportantPage from "../features/tasks/pages/ImportantPage";
import SearchResultPage from "../features/tasks/pages/SearchResultPage";

import DirectoriesPage from "../features/directories/pages/DirectoriesPage";

import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import AuthGate from "../features/auth/components/AuthGate";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import ProfilePage from "../features/auth/pages/ProfilePage";
// =================================================================================

const router = createBrowserRouter([
  {
    element: <AuthGate />,
    children: [
      // public routes
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "/profile", element: <ProfilePage /> }],
      },

      // private routes
      {
        element: (
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <AllTasksPage />,
          },
          {
            path: "/important-tasks",
            element: <ImportantPage />,
          },
          {
            path: "/completed-tasks",
            element: <CompletedPage />,
          },
          {
            path: "/uncompleted-tasks",
            element: <UncompletedPage />,
          },
          {
            path: "/directory/:id",
            element: <DirectoriesPage />,
          },
          {
            path: "/search",
            element: <SearchResultPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
