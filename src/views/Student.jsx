import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SidebarComponent from "@/components/SidebarComponent";
import { FileInput, Calendar } from "lucide-react";

export default function Student() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [course, setCourse] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/user?studentId=${username}`
        );

        setFirstname(response.data[0].firstname);
        setLastname(response.data[0].lastname);
        setCourse(response.data[0].course);
        setAvatar(response.data[0].avatar);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, [username]);

  const logOut = (e) => {
    e.preventDefault();

    localStorage.clear();
    navigate("/");
  };

  const group = {
    navMain: [
      {
        title: "Clearance",
        url: "#",
        icon: FileInput,
        isActive: true,
        items: [
          {
            title: "Queue",
            url: "/student/queue",
          },
          {
            title: "Requirements",
            url: "/student/requirements",
          },
          {
            title: "Payments",
            url: "/student/payments",
          },
        ],
      },
      {
        title: "Events",
        url: "#",
        icon: Calendar,
        items: [
          {
            title: "Upcoming",
            url: "/student/upcoming",
          },
          {
            title: "Listed",
            url: "/student/listed",
          },
        ],
      },
    ],
  };

  return (
    <>
      <SidebarComponent
        role="student"
        firstname={firstname}
        lastname={lastname}
        course={course}
        avatar={avatar}
        isSmallScreen={isSmallScreen}
        logOut={logOut}
        group={group}
      />
    </>
  );
}
