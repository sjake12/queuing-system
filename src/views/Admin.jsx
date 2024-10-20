import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const navigate = useNavigate();

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
