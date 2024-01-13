"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { login } from "@/services/user/userApi";
import useAuthStore from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password cannot exceed 50 characters." }),
});

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values) {
      await login({
        email: values.email,
        password: values.password,
      })
        .then((data) => {
          useAuthStore.getState().setToken(data.data.jwtToken);
          useAuthStore.getState().setAuthorized(true);
          const newUser = data.data.user;
          localStorage.setItem("user", JSON.stringify(newUser));
          useUserStore.getState().setUser(newUser);
          localStorage.setItem("token", data.data.jwtToken);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="w-screen h-full flex flex-col items-center p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 flex flex-col items-center justify-center gap-4 font-light"
        >
          <h1 className="text-3xl font-bold">Log in</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-light">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-light">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div>
            {`Don't have an account?`}
            <Link
              className="text-pink-1 hover:border-b hover:border-pink-1"
              href={"/signup"}
            >
              Join us now
            </Link>
          </div>
          <button
            className="w-full border border-2 border-black bg-pink rounded-lg py-2 font-bold"
            type="submit"
          >
            Log in
          </button>
        </form>
      </Form>
    </div>
  );
}
