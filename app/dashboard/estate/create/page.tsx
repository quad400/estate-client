"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import MultiImageUpload from "@/components/multi-image-upload";
import { post } from "@/lib/endpoints";
import { useCreateEstate } from "@/hooks/use-estatee";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  price: z.string().min(1, {
    message: "Product Price is required",
  }),
  details: z.string(),
});

const Page = () => {
  const router = useRouter();

  const { mutate } = useCreateEstate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      images: [],
      location: "",
      category: "",
      price: "",
      details: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
    router.refresh();
    form.reset();
    form.setValue("images", []);
  };

  return (
    <div className="w-full h-full container mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col justify-start items-start max-w-2xl">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiImageUpload
                      onChange={field.onChange}
                      values={field.value as string[]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex flex-col space-y-4 mt-4 w-full">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          type="text"
                          placeholder="Estate Title"
                          className="w-full text-sm shadow-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full gap-4 flex justify-start items-center">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            type="text"
                            placeholder="Estate Category"
                            className="w-full text-sm shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            {...field}
                            type="number"
                            placeholder="Estate Price"
                            className="w-full text-sm shadow-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isLoading}
                          type="text"
                          placeholder="Estate Location"
                          className="w-full text-sm shadow-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isLoading}
                          placeholder="Estate Details"
                          className="w-full min-h-[150px] text-sm shadow-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex sm:justify-end sm:items-end w-full sm:w-auto my-6">
            <Button size="lg" className="w-full sm:w-auto">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
