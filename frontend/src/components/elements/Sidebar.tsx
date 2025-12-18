import {
  Calendar,
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-[#0F172A] h-screen px-10 py-5 w-[300px] fixed">
      <Link className="flex items-center gap-5" to={"/"}>
        <h2 className="w-10 h-10 rounded-lg font-bold text-xl bg-[#FF6B6B] text-white flex items-center justify-center">
          E
        </h2>
        <h3 className="font-bold text-white text-xl">Evolve</h3>
      </Link>
      <ul className="mt-16 flex flex-col gap-3">
        <Link
          to={"/"}
          className={`px-4 py-3 rounded-lg  flex items-center gap-4 font-semibold  ${
            pathname == "/"
              ? "bg-[#FF6B6B] text-white"
              : "hover:text-white hover:bg-[#182035] text-gray-400"
          }`}
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </Link>
        <Link
          to={"/planner"}
          className={`px-4 py-3 rounded-lg  flex items-center gap-4 font-semibold  ${
            pathname == "/planner"
              ? "bg-[#FF6B6B] text-white"
              : "hover:text-white hover:bg-[#182035] text-gray-400"
          }`}
        >
          <Calendar />
          <span>Planner</span>
        </Link>
        <Link
          to={"/progress"}
          className={`px-4 py-3 rounded-lg  flex items-center gap-4 font-semibold  ${
            pathname == "/progress"
              ? "bg-[#FF6B6B] text-white"
              : "hover:text-white hover:bg-[#182035] text-gray-400"
          }`}
        >
          <TrendingUp />
          <span>Progress</span>
        </Link>
        <Link
          to={"/grocery"}
          className={`px-4 py-3 rounded-lg  flex items-center gap-4 font-semibold  ${
            pathname == "/grocery"
              ? "bg-[#FF6B6B] text-white"
              : "hover:text-white hover:bg-[#182035] text-gray-400"
          }`}
        >
          <ShoppingCart />
          <span>Grocery</span>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
