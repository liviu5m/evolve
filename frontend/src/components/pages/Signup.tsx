import React, { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { SignupData } from "../../lib/Types";
import { signUpUser } from "../../api/user";
import type { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();

  const { mutate: signUp } = useMutation({
    mutationKey: ["signup-user"],
    mutationFn: () => signUpUser(data),
    onSuccess: (data) => {
      console.log(data);
      navigate("/auth/verify/", {
        state: { fromSignup: true, userId: data.id },
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        if (typeof error.response?.data == "string") {
          toast.error(error.response?.data as string);
        } else {
          const errorMessages = Object.entries(error.response.data).map(
            ([field, message]) => <p key={field}>{message}</p>
          );

          toast.error(
            <div>
              <strong>Validation errors:</strong>
              {errorMessages}
            </div>
          );
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-3">
        <h2 className="w-12 h-12 rounded-lg font-bold text-2xl bg-[#FF6B6B] text-white flex items-center justify-center">
          E
        </h2>
        <h3 className="text-3xl font-extrabold mt-5">Create your account</h3>
        <p className="text-sm text-gray-800">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-[#FF6B6B] font-semibold">
            Sign in
          </Link>
        </p>

        <form
          className="bg-white rounded-xl shadow px-10 py-5 w-[400px] mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}
        >
          <div>
            <label htmlFor="fullName" className="text-sm font-semibold">
              Full Name
            </label>
            <div className="mt-2 flex items-center justify-center relative">
              <User className="absolute left-3 text-gray-400" />
              <input
                type="text"
                className="w-full outline-0 border px-4 py-2 border-gray-200 rounded-lg shadow pl-12 text-sm"
                id="fullName"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </label>
            <div className="mt-2 flex items-center justify-center relative">
              <Mail className="absolute left-3 text-gray-400" />
              <input
                type="email"
                className="w-full outline-0 border px-4 py-2 border-gray-200 rounded-lg shadow pl-12 text-sm"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <div className="mt-2 flex items-center justify-center relative">
              <Lock className="absolute left-3 text-gray-400" />
              <input
                type="password"
                className="w-full outline-0 border px-4 py-2 border-gray-200 rounded-lg shadow pl-12 text-sm"
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="passwordConfirmation"
              className="text-sm font-semibold"
            >
              Password Confirmation
            </label>
            <div className="mt-2 flex items-center justify-center relative">
              <Lock className="absolute left-3 text-gray-400" />
              <input
                type="password"
                className="w-full outline-0 border px-4 py-2 border-gray-200 rounded-lg shadow pl-12 text-sm"
                id="passwordConfirmation"
                value={data.passwordConfirmation}
                onChange={(e) =>
                  setData({ ...data, passwordConfirmation: e.target.value })
                }
              />
            </div>
          </div>
          <button className="text-white bg-[#FF6B6B] rounded-lg text-sm font-semibold w-full py-3 mt-5 cursor-pointer hover:scale-105 hover:bg-[#fc5d5d] mb-5">
            Start Your Journey
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
