import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Student from "./views/Student";
import Admin from "./views/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/student",
    element: <Student />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

export default router;
