import { deleteMethod, get, patch, post } from "@/lib/endpoints";
import { getEstate } from "@/lib/server";
import { CreateEstateType } from "@/lib/types/request";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useCreateEstate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<unknown, Error, CreateEstateType>({
    mutationFn: async (values) => await post("/estates", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estates"] });
      queryClient.invalidateQueries({ queryKey: ["my-estates"] });
      router.refresh();
      toast.success("Estate created successfully");
    },
  });

  return mutation;
};

export const useUpdateEstate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    unknown,
    Error,
    { estateId: string; values: CreateEstateType },
    string
  >({
    mutationFn: async ({ estateId, values }) => {
      return await patch(`/estates/${estateId}`, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estates"] });
      queryClient.invalidateQueries({ queryKey: ["my-estate"] });
      toast.success("Estate updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update estate`);
    },
  });
  return mutation;
};

export const useDeleteEstate = () => {
  const queryClient = useQueryClient();
  const router = useRouter()

  const mutation = useMutation<unknown, Error, { estateId: string }>({
    mutationFn: async ({ estateId }) => {
      return await deleteMethod(`/estates/${estateId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-estate"] });
      queryClient.invalidateQueries({ queryKey: ["estates"] });
      router.refresh()
      toast.success("Estate deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete estate`);
    },
  });

  return mutation;
};

export const useGetEstate = (estateId: string) => {
  const query = useQuery({
    queryKey: ["get-estate", estateId],
    queryFn: async () => await getEstate(estateId),
  });

  return query;
};
