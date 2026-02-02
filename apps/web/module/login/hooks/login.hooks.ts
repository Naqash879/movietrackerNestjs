import { useMutation } from "@tanstack/react-query";
import { loginCheck } from "@/services/user.service";
import { handleError } from "@/lib/axiosRequest";
import { TLogin } from "../schemas/login.schema";
import toast from "react-hot-toast";
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: TLogin) => await loginCheck(data),
    onSuccess: (res) => {
      toast.success("Successfully Login");
    },
    onError: (err) => {
      const { message } = handleError(err);
      toast.error(message);
    },
  });
};
