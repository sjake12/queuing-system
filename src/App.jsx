import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

function App() {
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost");
        const data = await response.json();
        setMessage(data.message);
        setStudents(data.students);
        console.log(data);
      } catch (e) {
        console.error(`Error fetching data: ${e}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
