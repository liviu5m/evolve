import React from "react";
import BodyLayout from "../layouts/BodyLayout";

const Grocery = () => {
  return (
    <BodyLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Weekly Shopping List</h1>
        <h4 className="text-[#FF6B6B] font-semibold cursor-pointer">Clear Checked</h4>
      </div>
    </BodyLayout>
  );
};

export default Grocery;
