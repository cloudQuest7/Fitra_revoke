import React from "react";
import { Home, BookOpen, Dumbbell, Leaf, Settings, LogOut, Sparkles, TrendingUp, Heart, GlassWater, BedDouble, CalendarDays, ChevronRight, CheckCircle2 } from "lucide-react";

const sidebarItems = [
  { name: "Home", icon: <Home className="w-6 h-6" />, href: "/home" },
  { name: "Journal", icon: <BookOpen className="w-6 h-6" />, href: "/journal" },
  { name: "Fitness", icon: <Dumbbell className="w-6 h-6" />, href: "/tracker" },
  { name: "Meditation", icon: <Leaf className="w-6 h-6" />, href: "/meditation" },
  { name: "Nutrition", icon: <Heart className="w-6 h-6" />, href: "/nutrition" },
  { name: "Settings", icon: <Settings className="w-6 h-6" />, href: "/settings" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-50 to-zinc-100">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white/90 border-r border-yellow-100 flex flex-col justify-between py-8 px-2 md:px-6 shadow-2xl">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-6xl bg-white/95 rounded-3xl shadow-2xl p-6 md:p-12 border border-yellow-100 flex flex-col gap-8">
          {/* Welcome & Streak Calendar */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Welcome Back, Champion!</h1>
              </div>
              <p className="text-zinc-700 text-lg mb-4">Your journey to a healthier, stronger you starts here. Stay consistent, track your progress, and celebrate every win!</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-zinc-800">Streak: <span className="text-yellow-500">7 days</span></span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-100">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-zinc-800">Level Up!</span>
                </div>
              </div>
            </div>
            {/* Calendar */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 shadow-md w-full max-w-xs flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays className="w-6 h-6 text-yellow-400" />
                <span className="font-bold text-zinc-900">July 2025</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs text-zinc-500 mb-1">
                {["S","M","T","W","T","F","S"].map((d) => <div key={d} className="text-center font-bold">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Example: 1-31, highlight streak days */}
                {Array.from({length: 31}, (_,i) => i+1).map((day) => (
                  <div key={day} className={`w-6 h-6 flex items-center justify-center rounded-full ${[1,2,3,4,5,6,7].includes(day) ? 'bg-yellow-400 text-white font-bold' : 'hover:bg-yellow-100'} transition-all`}>{day}</div>
                ))}
              </div>
              <span className="mt-2 text-xs text-zinc-500">Streak days highlighted</span>
            </div>
          </div>

          {/* Trackers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Water Intake */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col items-center shadow-md">
              <GlassWater className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-2xl font-bold text-zinc-900">1.5L / 2L</span>
              <span className="text-zinc-600 mb-2">Water Intake</span>
              <div className="w-full bg-blue-100 rounded-full h-2.5">
                <div className="bg-blue-400 h-2.5 rounded-full w-[75%]"></div>
              </div>
            </div>
            {/* Sleep Tracker */}
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex flex-col items-center shadow-md">
              <BedDouble className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-2xl font-bold text-zinc-900">7h / 8h</span>
              <span className="text-zinc-600 mb-2">Sleep</span>
              <div className="w-full bg-purple-100 rounded-full h-2.5">
                <div className="bg-purple-400 h-2.5 rounded-full w-[87.5%]"></div>
              </div>
            </div>
            {/* Exercise Tracker */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col items-center shadow-md">
              <Dumbbell className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-2xl font-bold text-zinc-900">45 min</span>
              <span className="text-zinc-600 mb-2">Exercise</span>
              <div className="w-full bg-yellow-100 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full w-[90%]"></div>
              </div>
            </div>
          </div>

          {/* Recent Workout & Quick Actions */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Recent Workout */}
            <div className="flex-1 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl p-6 shadow-md flex flex-col justify-between mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2"><Dumbbell className="w-6 h-6 text-yellow-400" /> Recent Workout</h2>
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-yellow-400/20 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">Full Body</span>
                <span className="text-zinc-500 text-sm">30 min</span>
                <span className="text-zinc-500 text-sm">🔥 250 kcal</span>
              </div>
              <ul className="text-zinc-700 text-sm mb-2 list-disc list-inside">
                <li>Push-ups: 3 x 15</li>
                <li>Squats: 3 x 20</li>
                <li>Plank: 3 x 1 min</li>
              </ul>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-semibold">Completed</span>
              </div>
              <a href="/tracker" className="mt-4 inline-flex items-center gap-2 text-yellow-700 font-semibold hover:underline">View All Workouts <ChevronRight className="w-4 h-4" /></a>
            </div>
            {/* Quick Actions & Motivation */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-zinc-100 to-yellow-50 rounded-2xl p-6 shadow-md flex flex-col justify-between">
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <a href="/tracker" className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md text-center">Go to Tracker</a>
                  <a href="/meditation" className="w-full bg-zinc-900 hover:bg-zinc-800 text-yellow-100 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md text-center">Start Meditation</a>
                  <a href="/journal" className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-md text-center">Write Journal</a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl p-6 shadow-md flex flex-col justify-between">
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Today's Motivation</h2>
                <p className="text-zinc-700 italic mb-4">“The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.”</p>
                <span className="text-zinc-500 text-sm">– Vince Lombardi</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
