import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Student from "./views/Student";
import Admin from "./views/Admin";
import Home from "./views/Home";
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
        path: "/admin/home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
