import { useState } from "react";
import { Outlet } from "react-router";
import MenuSide from "./components/MenuSide";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 overflow-hidden">
      <MenuSide open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100">
        <Outlet />
      </main>
    </div>
  );
}
