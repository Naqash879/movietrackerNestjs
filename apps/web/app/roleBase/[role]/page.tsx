"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLogoutMutation } from "@/module/admin/hooks/admin.hooks";
import Cookies from "js-cookie";

type AllowedRoles = "admin" | "user";

export default function RoleBasedPage() {
  const router = useRouter();
  const { role } = useParams();
  const { mutate: logout } = useLogoutMutation();
  const allowedRoles: AllowedRoles[] = ["admin", "user"];

  useEffect(() => {
    const lastRoute = Cookies.get("last_user_route");
    const isAllowedRoles = allowedRoles.includes(role as AllowedRoles);
    if (!isAllowedRoles) {
      setTimeout(() => {
        Cookies.remove("last_user_route", { path: "/" });
        logout();
      }, 5000);
    } else {
      if (isAllowedRoles && lastRoute) {
        //Cookies.remove("last_user_route", { path: "/" });
        router.push(lastRoute);
      } else if (role === "admin") router.push("/admin/dashboard");
      else if (role === "user") router.push("/");
    }
  }, [role, logout, router]);

  return (
    <div className="text-center mt-10 text-red-700">
      {!allowedRoles.includes(role as AllowedRoles)
        ? "You are not allowed to login. Redirecting..."
        : ""}
    </div>
  );
}
