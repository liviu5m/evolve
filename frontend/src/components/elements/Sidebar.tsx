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
    <div className="flex md:flex-col bg-[#0F172A] md:h-screen px-4 md:px-10 py-3 md:py-5 w-full md:w-[300px] md:fixed md:top-0 md:left-0 z-30">
      <Link className="hidden md:flex items-center gap-3 md:gap-5" to={"/"}>
        <h2 className="w-10 h-10 rounded-lg font-bold text-xl bg-[#FF6B6B] text-white flex items-center justify-center">
          E
        </h2>
        <h3 className="font-bold text-white text-xl">Evolve</h3>
      </Link>
      <ul className="flex flex-row md:flex-col justify-around md:justify-start w-full md:mt-16 gap-1 md:gap-3">
        <Link
          to={"/"}
          className={`p-2 md:px-4 md:py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-4 font-semibold transition-all ${
            pathname === "/"
              ? "text-[#FF6B6B] md:bg-[#FF6B6B] md:text-white"
              : "text-gray-400 hover:text-white md:hover:bg-[#182035]"
          }`}
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] md:text-base">Dashboard</span>
        </Link>

        <Link
          to={"/planner"}
          className={`p-2 md:px-4 md:py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-4 font-semibold transition-all ${
            pathname === "/planner"
              ? "text-[#FF6B6B] md:bg-[#FF6B6B] md:text-white"
              : "text-gray-400 hover:text-white md:hover:bg-[#182035]"
          }`}
        >
          <Calendar size={24} />
          <span className="text-[10px] md:text-base">Planner</span>
        </Link>

        <Link
          to={"/progress"}
          className={`p-2 md:px-4 md:py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-4 font-semibold transition-all ${
            pathname === "/progress"
              ? "text-[#FF6B6B] md:bg-[#FF6B6B] md:text-white"
              : "text-gray-400 hover:text-white md:hover:bg-[#182035]"
          }`}
        >
          <TrendingUp size={24} />
          <span className="text-[10px] md:text-base">Progress</span>
        </Link>

        <Link
          to={"/grocery"}
          className={`p-2 md:px-4 md:py-3 rounded-lg flex flex-col md:flex-row items-center gap-1 md:gap-4 font-semibold transition-all ${
            pathname === "/grocery"
              ? "text-[#FF6B6B] md:bg-[#FF6B6B] md:text-white"
              : "text-gray-400 hover:text-white md:hover:bg-[#182035]"
          }`}
        >
          <ShoppingCart size={24} />
          <span className="text-[10px] md:text-base">Grocery</span>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
