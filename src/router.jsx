import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Student from "./views/Student";
import Admin from "./views/Admin";
import StudentQueue from "./views/StudentQueue";
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
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["1"]}>
        <Admin />
      </ProtectedRoute>
    ),
    children: [],
  },
]);

export default router;
