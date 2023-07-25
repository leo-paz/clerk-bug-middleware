import Shell from "@/components/Shell";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Shell>{children}</Shell>;
};

export default layout;
