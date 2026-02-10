import axios, { AxiosError } from "axios";

export const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:8000",
  withCredentials: true,
});
axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axiosRequest.get("/auth/refresh");
        //console.log("Refresh success", data);
        return axiosRequest(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
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
