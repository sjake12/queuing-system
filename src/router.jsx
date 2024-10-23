import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Student from "./views/Student";
import Admin from "./views/Admin";
import StudentQueue from "./views/StudentQueue";
import AdminQueue from "./views/AdminQueue";
import UserSettings from "./views/UserSettings";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["1", "2"]}>
        <Student />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/student/queue",
        element: <StudentQueue />,
      },
      {
        path: "/student/settings",
        element: <UserSettings />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["1"]}>
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/queue",
        element: <AdminQueue />,
      },
      {
        path: "/admin/settings",
        element: <UserSettings />,
      },
    ],
  },
]);

export default router;
