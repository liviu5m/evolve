import { Bell, Search, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/api/user";
import { toast, ToastContainer } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationKey: ["logout-user"],
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      console.log(data);
      window.location.replace("/auth/login");
      toast.success("Successfully logged out!");
    },
    onError: (err) => {
      console.log(err);
      toast("Something went wrong");
    },
  });

  return (
    <div className="w-full bg-white shadow px-7 py-5 flex items-center justify-between">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex items-center justify-center gap-3 text-gray-600">
        <div className="rounded-full hover:bg-gray-200 p-2 cursor-pointer">
          <Search className="scale-[.9]" />
        </div>
        <div className="rounded-full hover:bg-gray-200 p-2 cursor-pointer">
          <Bell className="scale-[.9]" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="rounded-full hover:bg-gray-200 p-2 cursor-pointer">
              <User className="scale-[.9]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link to={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Header;
