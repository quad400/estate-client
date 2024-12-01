"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Rating } from "@smastrom/react-rating";
import { useModal } from "@/hooks/use-modal-store";
import { post } from "@/lib/endpoints";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useFeedbacks } from "@/hooks/use-feedbacks";
import { useUser } from "@clerk/nextjs";
import { IFeedbacks } from "@/lib/interfaces/estate";
import { IUser } from "@/lib/interfaces/user";

const formSchema = z.object({
  rate: z.number().min(1, {
    message: "Rate is required",
  }),
  comment: z.string().min(1, {
    message: "Comment is required",
  }),
});

const FeedbackModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { newFeedback, feedbacks, setFeedbacks } = useFeedbacks(data?.data); // Assuming data is passed as the estate ID
  const isModalOpen = isOpen && type === "feedback";
  const router = useRouter();
  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 0,
      comment: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newFeedbackData = {
        _id: Math.random(),
        user: { name: `${user?.firstName} ${user?.lastName}` } as IUser,
        rate: values.rate,
        comment: values.comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as unknown as IFeedbacks;

      setFeedbacks([newFeedbackData, ...feedbacks]);

      await newFeedback(values); // Submit the new feedback to the server
      form.reset();
      handleClose();
      toast.success("Feedback Added Successfully");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-semibold text-neutral-800">
            Feedback
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-center text-muted-foreground">
            Give Feedback to this estate
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2 md:space-y-8 px-6">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs sm:text-sm font-bold text-muted-foreground">
                      Rate
                    </FormLabel>
                    <FormControl>
                      <Rating
                        style={{ maxWidth: 250, border: 0 }}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs sm:text-sm font-bold text-muted-foreground">
                      Comment
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="bg-neutral-200/50 border-0 text-sm md:text-base focus-visible:ring-0
                         text-neutral-800 focus-visible:ring-offset-0"
                        placeholder="Comment"
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
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default FeedbackModal;
