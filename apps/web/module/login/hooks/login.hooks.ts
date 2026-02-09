import { useMutation } from "@tanstack/react-query";
import { loginCheck } from "@/services/user.service";
import { handleError } from "@/lib/axiosRequest";
import { TLogin } from "../schemas/login.schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export const useLoginMutation = () => {
  const routes = useRouter();
  return useMutation({
    mutationFn: async (data: TLogin) => await loginCheck(data),
    onSuccess: (res) => {
      routes.push(`/roleBase/${res.userData.role}`);
    },
    onError: (err) => {
      const { message } = handleError(err);
      toast.error(message);
    },
  });
};
