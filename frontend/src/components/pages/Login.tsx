import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginData } from "@/lib/Types";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/user";
import type { AxiosError } from "axios";

const Login = () => {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: () => loginUser(data),
    onSuccess: (data) => {
      console.log(data);
      navigate("/");
    },
    onError: (err: AxiosError) => {
      let msg = err.response?.data as string;
      msg.split(" ")[2] == "disabled";
      if (msg.split(" ")[2] == "disabled") {
        navigate("/auth/verify/", {
          state: { fromSignup: true, userId: msg.split(" ")[3] },
        });
      }
      console.log(err);
    },
  });

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-3">
        <h2 className="w-12 h-12 rounded-lg font-bold text-2xl bg-[#FF6B6B] text-white flex items-center justify-center">
          E
        </h2>
        <h3 className="text-3xl font-extrabold mt-5">Sign in to Adapt</h3>
        <p className="text-sm text-gray-800">
          Or{" "}
          <Link to={"/auth/signup"} className="text-[#FF6B6B] font-semibold">
            create new account
          </Link>
        </p>

        <form
          className="bg-white rounded-xl shadow px-10 py-5 w-[400px] mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div>
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
          <button className="text-white bg-[#FF6B6B] rounded-lg text-sm font-semibold w-full py-3 mt-5 cursor-pointer hover:scale-105 hover:bg-[#fc5d5d] mb-5">
            Sign in
          </button>
          <button
            type="button"
            className="bg-white rounded-lg text-sm font-semibold w-full py-3 cursor-pointer hover:scale-105 mb-5 border border-gray-300 flex items-center justify-center gap-5"
            onClick={() => handleGoogleLogin()}
          >
            <img src="/imgs/google.png" className="w-7" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
