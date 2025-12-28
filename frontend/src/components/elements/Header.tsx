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
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "@/lib/AppProvider";

const Header = () => {
  const { setUser } = useAppContext();
  const { pathname } = useLocation();
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

  let title;
  if (pathname == "/") title = "Dashboard";
  else if (pathname == "/planner") title = "Weekly Planner";
  else if (pathname == "/progress") title = "Your Progress";
  else if (pathname == "/grocery") title = "Grocery List";

  return (
    <div className="w-full bg-white shadow px-7 py-5 flex items-center justify-between">
      <h1 className="text-lg font-bold">{title}</h1>
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
            <Link to={"/profile"}>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout();
                setUser(null);
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
