"use client";

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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInCard = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {};

  return (
    <main className="bg-white min-h-screen ">
      <div className="mx-auto p-4">
        <div className="flex justify-center items-center flex-col pt-4 md:pt-14">
          <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
              <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            </CardHeader>
            <div className="my-5">
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
                          Organization Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            //   disabled={isLoading}
                            className="bg-neutral-200/50 border-0 text-sm md:text-base focus-visible:ring-0
                         text-neutral-800 focus-visible:ring-offset-0"
                            placeholder="Enter Organization name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignInCard;
