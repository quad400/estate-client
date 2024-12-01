"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useSignIn, useUser } from "@/hooks/use-auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useSignIn();

  const {data} = useUser()

  if(data){
    redirect("/")
  }
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
    // form.reset();
  };

  return (
    <main className="max-w-screen-2xl flex flex-col">
      <div className=" p-4 w-full">
        <div className="flex justify-center items-center flex-col pt-4">
          <Card className="w-full h-full md:w-[487px] border-none shadow">
            <CardHeader className="flex items-center justify-center text-center p-7">
              <CardTitle className="text-2xl font-medium">
                Welcome Back!
              </CardTitle>
              <div className="mt-4">
                <h4 className="text-xs">
                  By Signing in, you agree to our{" "}
                  <a href="#" className="text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500">
                    Privacy Policy
                  </a>
                </h4>
              </div>
            </CardHeader>
            <div className="my-2">
              <Separator />
            </div>
            <CardContent className="p-7">
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs sm:text-sm font-bold text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            className="bg-neutral-200/50 border-0 text-sm md:text-base focus-visible:ring-0
                         text-neutral-800 focus-visible:ring-offset-0"
                            placeholder="Enter Your Email"
                            {...field}
                          />
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
                        <FormLabel className="uppercase text-xs sm:text-sm font-bold text-muted-foreground">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            type="password"
                            className="bg-neutral-200/50 border-0 text-sm md:text-base focus-visible:ring-0
                         text-neutral-800 focus-visible:ring-offset-0"
                            placeholder="Enter Your Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full pt-6">
                    <Button className="w-full" disabled={isPending}>
                      Sign In
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="mt-5 flex  w-full justify-center items-center">
                <h4 className="text-xs">
                  Don't have an account?{" "}
                  <Link href="/auth/sign-up" className="text-blue-500">
                    Sign Up
                  </Link>
                </h4>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Page;
