import React from "react";
import type { ReactNode } from "react";
import Sidebar from "../elements/Sidebar";
import Header from "../elements/Header";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex text-[#121212] bg-[#F9FAFB] min-h-screen">
      <Sidebar />
      <div className="w-[300px] flex-shrink-0" aria-hidden="true"></div>
      <div className="w-full flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BodyLayout;
