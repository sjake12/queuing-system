import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));

    try {
      const getUser = await axios.get("http://localhost/api/user");

      const { firstname, lastname } = getUser.data;
      setUser(`${firstname} ${lastname}`);

      console.log(user);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post("http://localhost/api/auth", formData);
      const { permissions, role, token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Set the default Authorization header for future requests
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      //Login the user
      login({ username, role, permissions });

      if (role === 1) {
        navigate("/admin");
      }

      if (role === 2) {
        navigate("/student");
      }

      console.log(response);
    } catch (e) {
      console.error(`There was an error! ${e}`);
      setMessage(e.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-green-200">
      <div className="flex flex-col gap-4 w-max h-max rounded-lg shadow-xl bg-white p-6">
        <h1 className="text-4xl font-bold">Log In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
          <input
            type="text"
            placeholder="Username"
            className="border border-black rounded-sm p-2"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-black rounded-sm p-2"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {message && <p className="text-red-500">User not found!</p>}
          <Button type="submit">Log In</Button>
        </form>
      </div>
    </div>
  );
}
