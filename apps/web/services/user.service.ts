import { handleError } from "@/lib/axiosRequest";
import { TSignUp } from "@/module/signup/signUpSchema";

export const signUp = async (data: TSignUp) => {
  try {
  } catch (error) {
    const { message } = handleError(error);
    throw new Error(message);
  }
};
