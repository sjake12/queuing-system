import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Student() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/user?studentId=${username}`
        );

        setFirstname(response.data[0].firstname);
        setLastname(response.data[0].lastname);
        setCourse(response.data[0].course);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <h1>
        {firstname} {lastname} {course}
      </h1>
      <form onSubmit={handleSubmit}>
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
}
