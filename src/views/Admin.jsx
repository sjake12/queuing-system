import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.clear();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
