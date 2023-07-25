import React from "react";
import NavBar from "@/components/NavBar";

const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between min-h-full bg-gray-100">
      <NavBar />
      <div className="mx-auto mb-auto max-w-7xl">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Shell;
