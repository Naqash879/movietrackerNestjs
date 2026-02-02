"use client";
import Link from "next/link";
import { useState } from "react";
import { useLoginMutation } from "../login/hooks/login.hooks";
import { TLogin } from "./schemas/login.schema";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const loginMutation = useLoginMutation();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: TLogin = {
      email,
      password,
    };
    loginMutation.mutate(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Login 👋</h2>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            value={email}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            value={password}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
