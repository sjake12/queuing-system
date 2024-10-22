import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarComponent from "@/components/SidebarComponent";
import { FileInput, Calendar } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [course, setCourse] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/user?studentId=${username}`
        );

        setFirstname(response.data[0].firstname);
        setLastname(response.data[0].lastname);
        setCourse(response.data[0].course);
      } catch (e) {
        console.error(e);
      }
    };

    loadUser();
  }, []);

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
            url: "/admin/queue",
          },
          {
            title: "Requirements",
            url: "#",
          },
          {
            title: "Payments",
            url: "#",
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
            url: "#",
          },
          {
            title: "Listed",
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <>
      <SidebarComponent
        role="admin"
        firstname={firstname}
        lastname={lastname}
        course={course}
        isSmallScreen={isSmallScreen}
        logOut={logOut}
        group={group}
      />
    </>
  );
}
