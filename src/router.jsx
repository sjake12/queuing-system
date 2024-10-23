import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Student from "./views/Student";
import Admin from "./views/Admin";
import StudentQueue from "./components/StudentQueue";
import AdminQueue from "./components/AdminQueue";
import UserSettings from "./components/UserSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import Requirements from "./components/Requirements";
import Payments from "./components/Payments";
import Upcoming from "./components/Upcoming";
import Listed from "./components/Listed";

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
        path: "/student/requirements",
        element: <Requirements />,
      },
      {
        path: "/student/payments",
        element: <Payments />,
      },
      {
        path: "/student/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/student/listed",
        element: <Listed />,
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
