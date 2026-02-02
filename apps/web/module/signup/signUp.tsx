"use client";
import Link from "next/link";
import { useState } from "react";
import { useSignUpMutation } from "./hooks/signUpHooks";
import { TSignUp } from "./signUpSchema";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signMutation = useSignUpMutation();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    signMutation.mutate(data);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            Create Account 🚀
          </h2>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <input
              value={name}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              value={email}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              value={password}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              className="text-purple-600 font-medium hover:underline"
              href={"/login"}
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
