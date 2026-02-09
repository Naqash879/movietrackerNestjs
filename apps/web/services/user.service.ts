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
  try {
    const res = await axiosRequest.post("/auth/loginCheck", data);
    return res.data;
  } catch (error) {
    const { message } = handleError(error);
    throw new Error(message);
  }
};
export const logout = async () => {
  try {
    const res = await axiosRequest.get("/auth/logout");
    return res;
  } catch (err) {
    const { message } = handleError(err);
    throw new Error(message);
  }
};
