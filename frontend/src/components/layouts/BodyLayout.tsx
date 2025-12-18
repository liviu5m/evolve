import React from "react";
import type { ReactNode } from "react";
import Sidebar from "../elements/Sidebar";
import Header from "../elements/Header";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex text-[#121212] bg-white">
      <Sidebar />
      <div className="w-[300px] flex-shrink-0" aria-hidden="true"></div>
      <div className="w-full flex-1 min-w-0">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default BodyLayout;
