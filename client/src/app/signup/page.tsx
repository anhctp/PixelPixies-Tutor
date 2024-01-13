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

const formSchema = z.object({
  fullname: z.string(),
  email: z.string().email({
    message: "Invalid email format. Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password cannot exceed 50 characters." }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="w-screen h-full flex flex-col items-center p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 flex flex-col items-center justify-center gap-4 font-light"
        >
          <h1 className="text-3xl font-bold">Sign up</h1>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-light">Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
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
            {`Already have an account? `}
            <Link
              className="text-pink-1 hover:border-b hover:border-pink-1"
              href={"/login"}
            >
              Log in now
            </Link>
          </div>
          <button
            className="w-full border border-2 border-black bg-pink rounded-lg py-2 font-bold"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </Form>
    </div>
  );
}
