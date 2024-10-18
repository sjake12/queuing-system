import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "@/components/LoginForm";

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

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
}
