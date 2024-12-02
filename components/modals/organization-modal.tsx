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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import ImageUpload from "@/components/image-upload";
import { useModal } from "@/hooks/use-modal-store";
import { post } from "@/lib/endpoints";
import { useCreateAgent } from "@/hooks/use-agent";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Organization name is required",
  }),
  image: z.string().min(1, {
    message: "Organization image is required",
  }),
  phone: z.string().min(1, {
    message: "Organization phone number is required",
  }),
});

const OrganizationModal = () => {
  const { isOpen, onClose, type } = useModal();


  const isModalOpen = isOpen && type === "becomeAgent";

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
      phone: "",
    },
  });

  const { isPending, mutate } = useCreateAgent();

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
    form.reset();
    router.refresh();
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-semibold text-neutral-800">
            Become An Agent
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-center text-muted-foreground">
            Give your oranization a name and an image. You can always change it
            later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2 md:space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs sm:text-sm font-bold text-muted-foreground">
                      Organization Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs sm:text-sm font-bold text-muted-foreground">
                      Organization Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-neutral-200/50 border-0 text-sm md:text-base focus-visible:ring-0
                         text-neutral-800 focus-visible:ring-offset-0"
                        placeholder="Enter organization phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-neutral-300 px-6 py-4">
              <Button className="w-full md:w-auto" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default OrganizationModal;
