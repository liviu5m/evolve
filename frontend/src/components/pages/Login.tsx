import { useEffect, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { LoginData } from "@/lib/Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/api/user";
import type { AxiosError } from "axios";
import { useAppContext } from "@/lib/AppProvider";

const Login = () => {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const { user } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: () => loginUser(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries();
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
      setData({ email: "", password: "" });
      setErrorMessage(msg);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      console.log(msg);
    },
  });

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

  useEffect(() => {
    const errorType = searchParams.get("error");

    if (errorType) {
      const messages: Record<string, string> = {
        provider_mismatch:
          "This account uses a different login method (e.g., Credentials).",
        invalid_credentials: "Invalid email or password.",
        default: "An error occurred during authentication.",
      };

      setErrorMessage(messages[errorType] || messages.default);
      searchParams.delete("error");
      setSearchParams(searchParams, { replace: true });
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="flex items-center justify-center flex-col gap-3 w-full max-w-md">
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
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {errorMessage}
          </div>
        )}
        <form
          className="bg-white rounded-xl shadow px-6 sm:px-10 py-5 w-full mt-8"
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
