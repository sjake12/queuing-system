import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/api/auth", {
        username,
        password,
      });

      if (response.data.status === 200) {
        alert("Login successful");
      }
    } catch (e) {
      console.error(`There was an error! ${e}`);
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
