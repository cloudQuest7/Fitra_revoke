"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Dumbbell, Flame, HeartPulse, CalendarDays, BarChart2, Plus, X, CheckCircle2 } from "lucide-react";

const TABS = [
  { key: "workouts", label: "Workouts", icon: <Dumbbell className="w-5 h-5" /> },
  { key: "goals", label: "Goals", icon: <CheckCircle2 className="w-5 h-5" /> },
];

const DEMO_WORKOUTS = [
  { id: 1, name: "Push Day", date: "2025-07-01", exercises: [
    { name: "Bench Press", sets: 4, reps: 8, weight: 60 },
    { name: "Shoulder Press", sets: 3, reps: 10, weight: 30 },
    { name: "Triceps Pushdown", sets: 3, reps: 12, weight: 20 },
  ] },
  { id: 2, name: "Leg Day", date: "2025-06-30", exercises: [
    { name: "Squats", sets: 4, reps: 8, weight: 80 },
    { name: "Leg Press", sets: 3, reps: 12, weight: 120 },
    { name: "Calf Raise", sets: 3, reps: 15, weight: 40 },
  ] },
];



export default function FitnessPage() {
  const [tab, setTab] = useState("workouts");
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [workouts, setWorkouts] = useState(DEMO_WORKOUTS);
  // Removed meals and progress state
  const [newWorkout, setNewWorkout] = useState({ name: "", date: "", exercises: [{ name: "", sets: 3, reps: 10, weight: 0 }] });

  // --- Add Workout Modal ---
  const handleAddWorkout = () => {
    if (!newWorkout.name || !newWorkout.date) return;
    setWorkouts([{ ...newWorkout, id: Date.now() }, ...workouts]);
    setShowAddWorkout(false);
    setNewWorkout({ name: "", date: "", exercises: [{ name: "", sets: 3, reps: 10, weight: 0 }] });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-zinc-100">
      <Sidebar />
      <div className="flex-1 max-w-6xl mx-auto p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-blue-900 flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-blue-400 animate-bounce" /> Fitness
          </h1>
          <nav className="flex gap-2 flex-wrap">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all ${tab === t.key ? "bg-blue-400 text-white shadow" : "bg-zinc-100 text-blue-900 hover:bg-blue-100"}`}
                onClick={() => setTab(t.key)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Workouts Tab */}
        {tab === "workouts" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2"><Dumbbell className="w-6 h-6 text-blue-400" /> Workouts</h2>
              <button
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
                onClick={() => setShowAddWorkout(true)}
              >
                <Plus className="w-5 h-5" /> Add Workout
              </button>
            </div>

            {/* Quick Access Cards */}
            <div className="flex gap-4 mb-8">
              <a href="/fitness/yoga" className="flex flex-col items-center bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl shadow p-4 w-48 hover:scale-105 transition cursor-pointer border-2 border-yellow-200">
                <img src="/public/yoga.png" alt="Yoga" className="w-20 h-20 object-contain mb-2 rounded-xl" />
                <span className="font-bold text-yellow-700 text-lg">Yoga</span>
              </a>
              <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow p-4 w-48 hover:scale-105 transition cursor-pointer border-2 border-blue-200">
                <img src="/public/fullbody.png" alt="Full Body" className="w-20 h-20 object-contain mb-2 rounded-xl" />
                <span className="font-bold text-blue-700 text-lg">Full Body</span>
              </div>
              <div className="flex flex-col items-center bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl shadow p-4 w-48 hover:scale-105 transition cursor-pointer border-2 border-pink-200">
                <img src="/public/abs.png" alt="Abs" className="w-20 h-20 object-contain mb-2 rounded-xl" />
                <span className="font-bold text-pink-700 text-lg">Abs</span>
              </div>
            </div>

            {/* Add Workout Modal */}
            {showAddWorkout && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in">
                  <button
                    className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700"
                    onClick={() => setShowAddWorkout(false)}
                    title="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h3 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2"><Dumbbell className="w-6 h-6 text-blue-400" /> New Workout</h3>
                  <input
                    placeholder="Workout Name"
                    title="Workout Name"
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white/80 text-blue-900 font-semibold focus:outline-blue-400 mb-3"
                    value={newWorkout.name}
                    onChange={e => setNewWorkout(w => ({ ...w, name: e.target.value }))}
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white/80 text-blue-900 font-semibold focus:outline-blue-400 mb-3"
                    value={newWorkout.date}
                    onChange={e => setNewWorkout(w => ({ ...w, date: e.target.value }))}
                    title="Workout Date"
                    placeholder="Workout Date"
                  />
                  <div className="mb-3">
                    <label className="block text-blue-700 font-semibold mb-1">Exercises</label>
                    {newWorkout.exercises.map((ex, idx) => (
                      <div key={idx} className="flex gap-2 mb-2 items-center">
                        <input
                          className="flex-1 px-2 py-1 rounded border border-blue-200 bg-white/80 text-blue-900"
                          placeholder="Exercise Name"
                          value={ex.name}
                          onChange={e => setNewWorkout(w => {
                            const arr = [...w.exercises];
                            arr[idx].name = e.target.value;
                            return { ...w, exercises: arr };
                          })}
                        />
                        <input
                          type="number"
                          className="w-16 px-2 py-1 rounded border border-blue-200 bg-white/80 text-blue-900"
                          placeholder="Sets"
                          value={ex.sets}
                          min={1}
                          onChange={e => setNewWorkout(w => {
                            const arr = [...w.exercises];
                            arr[idx].sets = Number(e.target.value);
                            return { ...w, exercises: arr };
                          })}
                        />
                        <input
                          type="number"
                          className="w-16 px-2 py-1 rounded border border-blue-200 bg-white/80 text-blue-900"
                          placeholder="Reps"
                          value={ex.reps}
                          min={1}
                          onChange={e => setNewWorkout(w => {
                            const arr = [...w.exercises];
                            arr[idx].reps = Number(e.target.value);
                            return { ...w, exercises: arr };
                          })}
                        />
                        <input
                          type="number"
                          className="w-20 px-2 py-1 rounded border border-blue-200 bg-white/80 text-blue-900"
                          placeholder="Weight (kg)"
                          value={ex.weight}
                          min={0}
                          onChange={e => setNewWorkout(w => {
                            const arr = [...w.exercises];
                            arr[idx].weight = Number(e.target.value);
                            return { ...w, exercises: arr };
                          })}
                        />
                        <button
                          className="text-red-400 hover:text-red-600 px-2"
                          onClick={() => setNewWorkout(w => ({ ...w, exercises: w.exercises.filter((_, i) => i !== idx) }))}
                          type="button"
                          title="Remove exercise"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded font-semibold mt-1 flex items-center gap-1"
                      onClick={() => setNewWorkout(w => ({ ...w, exercises: [...w.exercises, { name: "", sets: 3, reps: 10, weight: 0 }] }))}
                      type="button"
                    >
                      <Plus className="w-4 h-4" /> Add Exercise
                    </button>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      className="bg-zinc-300 hover:bg-zinc-400 text-zinc-700 px-4 py-2 rounded-lg font-semibold"
                      onClick={() => setShowAddWorkout(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md flex items-center gap-2"
                      onClick={handleAddWorkout}
                      type="button"
                    >
                      <Plus className="w-5 h-5" /> Add Workout
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Workouts List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workouts.map(w => (
                <div key={w.id} className="rounded-2xl p-5 shadow-lg border border-blue-100 bg-white group transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-blue-900 flex items-center gap-2">
                      <Dumbbell className="w-5 h-5 text-blue-400" /> {w.name}
                    </span>
                    <span className="text-xs text-blue-500 font-semibold"><CalendarDays className="w-4 h-4 inline mr-1" /> {w.date}</span>
                  </div>
                  <ul className="mb-2">
                    {w.exercises.map((ex, i) => (
                      <li key={i} className="flex gap-2 text-blue-800 text-sm items-center mb-1">
                        <span className="font-semibold">{ex.name}</span>
                        <span className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-xs">{ex.sets}x{ex.reps}</span>
                        <span className="text-xs text-blue-500">{ex.weight}kg</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {tab === "goals" && (
          <div>
            <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2 mb-4"><CheckCircle2 className="w-6 h-6 text-purple-400" /> Goals</h2>
            <ul className="list-disc pl-6 text-purple-900 text-lg">
              <li>🏋️‍♂️ Workout 4x per week</li>
              <li>🥗 Eat 120g protein daily</li>
              <li>🚶‍♂️ 10,000 steps per day</li>
              <li>💧 Drink 2L water daily</li>
              <li>🛌 Sleep 7+ hours</li>
            </ul>
          </div>
        )}

        {/* Removed Calendar Tab */}
      </div>
    </div>
  );
}
