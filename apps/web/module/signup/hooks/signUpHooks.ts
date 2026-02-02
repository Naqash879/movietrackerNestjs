import { signUp } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { TSignUp } from "../signUpSchema";
import { handleError } from "@/lib/axiosRequest";
import toast from "react-hot-toast";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (data: TSignUp) => await signUp(data),
    onSuccess: (res) => {
      toast.success("Successfully SignUp");
    },
    onError: (err) => {
      const { message } = handleError(err);
      toast.error(message);
    },
  });
};
