import axios, { AxiosError } from "axios";

export const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8000",
  withCredentials: true,
});
export const handleError = (err: unknown) => {
  if (err instanceof AxiosError) {
    const message =
      err.response?.data?.message ??
      err?.message ??
      "this error is comes from Axios Error";
    return { message };
  }
  if (err instanceof Error) {
    const message = err?.message ?? "error comes from Default Error";
    return { message };
  } else {
    const message = "Something went wrong";
    return { message };
  }
};
