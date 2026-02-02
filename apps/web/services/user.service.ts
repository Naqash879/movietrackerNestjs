import { axiosRequest, handleError } from "@/lib/axiosRequest";
import { TLogin } from "@/module/login/schemas/login.schema";
import { TSignUp } from "@/module/signup/signUpSchema";

export const signUp = async (data: TSignUp) => {
  try {
    const res = axiosRequest.post("/auth/signUp", data);
    return res;
  } catch (error) {
    const { message } = handleError(error);
    throw new Error(message);
  }
};
export const loginCheck = async (data: TLogin) => {
  console.log("this login service", data);
};
