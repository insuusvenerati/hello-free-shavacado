import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Sidebar className="hidden max-h-full p-5 lg:grid absolute overflow-y-auto left-0 w-72 auto-rows-max gap-10" />
      {children}
    </>
  );
};
