import { post } from "@/lib/endpoints";
import { CreateFeedbackType } from "@/lib/types/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export const useCreateFeedback = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const mutation = useMutation<unknown, Error, {estateId: string, values: CreateFeedbackType}>({
      mutationFn: async ({estateId, values}) => {
        console.log(estateId, values)
        await post(`/estates/${estateId}/feedbacks`, values)
      },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
        queryClient.invalidateQueries({ queryKey: ["estates"] });
        queryClient.invalidateQueries({ queryKey: ["get-estate"] });
        router.refresh();
        toast.success("Feedback created successfully");
      },
    });
  
    return mutation;
  };
  