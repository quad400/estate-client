import { get, patch, post } from "@/lib/endpoints";
import { CreateEstateType } from "@/lib/types/request";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export const useCreateEstate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<unknown, Error, CreateEstateType>({
    mutationFn: async (values) => await post("/estates", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estates", "my-estates"] });
      toast.success("Estate created successfully");
    },
  });

  return mutation;
};

export const useUpdateEstate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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
      queryClient.invalidateQueries({ queryKey: ["estates", "my-estates"] });
      toast.success("Estate updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update estate: ${error.message}`);
    },
  });
  return mutation;
};

export const useGetMyEstates = () => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["my-estates"],
    queryFn: async () => {
      const res = await get(`/estates/user/my-estates?limit=10&page=${page}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  return {
    query,
    setPage,
    page,
  };
};
