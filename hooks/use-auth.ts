import { post } from "@/lib/endpoints";
import { getCurrent, signOut } from "@/lib/server";
import { CreateUserType, LoginType } from "@/lib/types/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, LoginType>({
    mutationFn: async (data) => {
      const response = await post("/auth/login", data);
      console.log(response);
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      redirect("/");
    },
  });
  return mutation;
};

export const useSignUp = () => {
  const mutation = useMutation<unknown, Error, CreateUserType>({
    mutationFn: async (data) => {
      const response = await post("/auth/register", data)
        .then((res) => {})
        .catch((error) => {});
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      redirect("/");
    },
    onError: () => {
      toast.error("Already registered");
    },
  });

  return mutation;
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter()

  const mutation = useMutation<unknown, Error>({
    mutationFn: async () => await signOut(),
    onSuccess: () => {
      toast.success("Logged out successfully");
      window.location.reload()
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return mutation;
};

export const useUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrent(),
  });

  return query;
};
