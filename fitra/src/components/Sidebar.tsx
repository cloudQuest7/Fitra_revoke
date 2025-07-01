import React from "react";
import { Home, BookOpen, Dumbbell, Leaf, Settings, LogOut, Heart } from "lucide-react";

const sidebarItems = [
  { name: "Home", icon: <Home className="w-6 h-6" />, href: "/home" },
  { name: "Journal", icon: <BookOpen className="w-6 h-6" />, href: "/journal" },
  { name: "Fitness", icon: <Dumbbell className="w-6 h-6" />, href: "/fitness" },
  { name: "Meditation", icon: <Leaf className="w-6 h-6" />, href: "/meditation" },
  { name: "Nutrition", icon: <Heart className="w-6 h-6" />, href: "/nutrition" },
  { name: "Settings", icon: <Settings className="w-6 h-6" />, href: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-20 md:w-64 bg-white/90 border-r border-yellow-100 flex flex-col justify-between py-8 px-2 md:px-6 shadow-2xl min-h-screen">
      <div>
        <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
          <Dumbbell className="w-8 h-8 text-yellow-400" />
          <span className="hidden md:inline text-2xl font-extrabold text-zinc-900 tracking-tight">Fitra</span>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-zinc-700 font-semibold hover:bg-yellow-100 transition-all duration-200 group"
            >
              <span className="text-yellow-400 group-hover:text-yellow-500">{item.icon}</span>
              <span className="hidden md:inline">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
      <a href="/api/auth/signout" className="flex items-center gap-3 px-3 py-3 rounded-lg text-zinc-700 font-semibold hover:bg-red-100 transition-all duration-200 group">
        <span className="text-red-400 group-hover:text-red-500"><LogOut className="w-6 h-6" /></span>
        <span className="hidden md:inline">Logout</span>
      </a>
    </aside>
  );
}
