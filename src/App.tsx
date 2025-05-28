import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/app/Header";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="w-full h-full mx-auto flex-1">
        <Outlet />
      </main>
    </div>
  );
}
