import { post } from "@/lib/endpoints";
import { CreateAgentType } from "@/lib/types/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateAgent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<unknown, Error, CreateAgentType>({
    mutationFn: async (values) => await post("/agents", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard");
      toast.success("Agent created successfully");
    },
  });

  return mutation;
};
