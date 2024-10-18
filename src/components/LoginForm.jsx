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
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Enter a valid username",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function LoginForm() {
  const { toast } = useToast();

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
    try {
      const response = await axios.post("http://localhost/api/auth", formData);

      if (response) {
        console.log("Login successful");
        console.log(response);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "User Not Found!",
        description: "Username or Password not found.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-[30%] flex flex-col justify-center">
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center w-full">
        Queue your clearance online
      </CardFooter>
    </Card>
  );
}
