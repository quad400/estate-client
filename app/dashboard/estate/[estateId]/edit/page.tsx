"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useEffect } from "react";
import { useEstates } from "@/hooks/use-estate";
import { toast } from "sonner";
import { patch } from "@/lib/endpoints";
import MultiImageUpload from "@/components/multi-image-upload";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  images: z.array(z.string()).min(1, {
    message: "At least one image is required", // Custom error message for empty array
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

const Page = ({ params }: { params: { estateId: string } }) => {
  const router = useRouter();
  const { loading, estate } = useEstates(params.estateId);

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

  useEffect(() => {
    if (estate) {
      form.setValue("title", estate.title);
      // @ts-expect-error
      form.setValue("images", estate.images);
      form.setValue("location", estate.location);
      form.setValue("category", estate.category);
      form.setValue("price", estate.price.toString());
      form.setValue("details", estate.details || "");
    }
  }, [estate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await patch(`/estates/${params.estateId}`, values);
      toast.success("Estate updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update product");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full container mb-6">
      {estate && !loading && (
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
                        values={field.value as string[]}
                        onChange={field.onChange}
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
                            placeholder="Product Name"
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
                              placeholder="Category"
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
                              value={Number(field.value)}
                              type="number"
                              placeholder="Price"
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
                            placeholder="Location"
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
                            placeholder="Product Details"
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
                Update
              </Button>
            </div>
          </form>
        </Form>
      )}
      {loading && !estate && (
        <div className="w-full">
          <div className="flex container flex-col justify-start space-y-2 items-start">
            <Skeleton className="h-[200px] w-[200px]" />
            <Skeleton className="h-[50px] w-[300px]" />
            <div className="flex space-x-4 items-center justify-between">
              <Skeleton className="h-[50px] w-[150px]" />
              <Skeleton className="h-[50px] w-[150px]" />
            </div>
            <Skeleton className="h-[150px] w-[300px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
