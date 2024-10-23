import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PersonIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import api from "@/lib/auth";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Enter a valid username",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function Login() {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "1") {
        navigate("/admin");
      } else if (role === "2") {
        navigate("/student");
      }
    }
  }, [navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost/api/auth", formData);
      const { permissions, role, token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("permision", permissions);
        localStorage.setItem("username", values.username);
        localStorage.setItem("role", role);

        if (role === 1) {
          navigate("/admin");
        }

        if (role === 2) {
          navigate("/student");
        }
      }
    } catch (err) {
      console.error(err);
      if (err.code === "ERR_NETWORK") {
        toast({
          title: err.message,
          description: "Connection not found",
          variant: "destructive",
        });
      }

      if (err.status === 404) {
        toast({
          title: "User Not Found!",
          description: "Invalid Username or Password.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="w-full sm:w-96 flex flex-col justify-center">
        <CardHeader className="self-center text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to process your clearance</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      <PersonIcon />
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Student ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      <LockClosedIcon />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isloading ? (
                <Button type="submit" className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center w-full">
          Queue your clearance online
        </CardFooter>
      </Card>
    </div>
  );
}
