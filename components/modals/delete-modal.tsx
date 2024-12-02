"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";
import { useDeleteEstate } from "@/hooks/use-estatee";

const formSchema = z.object({
  rate: z.number().min(1, {
    message: "Rate is required",
  }),
  comment: z.string().min(1, {
    message: "Comment is required",
  }),
});

const DeleteModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteEstate";
  const { mutateAsync, isPending } = useDeleteEstate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 0,
      comment: "",
    },
  });

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async () => {
    await mutateAsync({ estateId: data.data });
    onClose();
    handleClose();
    toast.success("Feedback Added Successfully");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-semibold text-neutral-800">
            Delete Estate
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full space-y-3">
              <h1 className="text-lg text-center text=xl font-medium text-neutral-700">
                Are you sure you want to delete
              </h1>
            </div>
            <div className="bg-neutral-300 px-6 py-4 flex w-full justify-between items-center">
              <Button
                className=""
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className=""
                variant="destructive"
                disabled={isPending}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteModal;
