import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div className="flex justify-between items-center w-full py-2 px-10 shadow-md">
        <div className="flex gap-2 items-center">
          <div className="flex-col">
            <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {firstname} {lastname}, {course}
            </h1>
            <Badge>Student</Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form onSubmit={handleSubmit}>
                <Button variant="ghost" type="submit" size="sm">
                  Logout
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
