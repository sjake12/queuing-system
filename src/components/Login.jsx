import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post("http://localhost/api/users", formData);

      if (response.data.role === 1) {
        navigate("/admin");
      } else if (response.data.role === 2) {
        navigate("/student");
      } else if (response.data === false) {
        setMessage("User not found");
      }
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
          {message && (
            <p className="text-red-500">Invalid username or password</p>
          )}
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded-lg hover:opacity-80 font-bold"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
