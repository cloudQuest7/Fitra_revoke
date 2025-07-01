"use client";
import React from "react";
import Sidebar from "../../../components/Sidebar";

const YOGA_EXERCISES = [
  { name: "Downward Dog", duration: "30 sec", image: "/public/yoga1.png" },
  { name: "Cobra Pose", duration: "30 sec", image: "/public/yoga2.png" },
  { name: "Child's Pose", duration: "30 sec", image: "/public/yoga3.png" },
  { name: "Warrior II", duration: "30 sec", image: "/public/yoga4.png" },
  { name: "Tree Pose", duration: "30 sec", image: "/public/yoga5.png" },
];

export default function YogaPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-50 to-zinc-100">
      <Sidebar />
      <div className="flex-1 max-w-2xl mx-auto p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-yellow-700 mb-6 flex items-center gap-2">
          <img src="/public/yoga.png" alt="Yoga" className="w-10 h-10" /> Yoga Routine
        </h1>
        <div className="grid grid-cols-1 gap-4 mb-8">
          {YOGA_EXERCISES.map((ex, i) => (
            <div key={i} className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
              <img src={ex.image} alt={ex.name} className="w-16 h-16 object-contain rounded-lg bg-yellow-100" />
              <div>
                <div className="font-bold text-lg text-yellow-800">{ex.name}</div>
                <div className="text-yellow-500 text-sm">{ex.duration}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold py-3 rounded-xl text-xl shadow-lg transition-all">Start</button>
      </div>
    </div>
  );
}
