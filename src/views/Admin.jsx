import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          "http://localhost/api/validate",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response) {
          navigate("/student");
        }
      } catch (e) {
        console.error(e);
        navigate("/student");
      }
    };

    validate();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.clear();
    navigate("/");
  };

  return (
    <Button type="submit" onClick={handleSubmit}>
      Logout
    </Button>
  );
}
