"use client";
import React, { useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { User, Cog, Info, UploadCloud } from "lucide-react";

const TABS = [
  { key: "profile", label: "Profile Settings", icon: <User className="w-5 h-5" /> },
  { key: "preferences", label: "App Preferences", icon: <Cog className="w-5 h-5" /> },
  { key: "about", label: "About", icon: <Info className="w-5 h-5" /> },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    photo: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setProfile(p => ({ ...p, photo: url }));
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-50 to-zinc-100">
      <Sidebar />
      <div className="flex-1 max-w-3xl mx-auto p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-yellow-700 mb-8 flex items-center gap-2">
          <Cog className="w-8 h-8 text-yellow-400" /> Settings
        </h1>
        <div className="flex gap-4 mb-8">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-lg ${tab === t.key ? "bg-yellow-400 text-zinc-900 shadow" : "bg-zinc-100 text-zinc-700 hover:bg-yellow-100"}`}
              onClick={() => setTab(t.key)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        {/* Profile Settings */}
        {tab === "profile" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <img
                    src={photoPreview || "/public/default-profile.png"}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-yellow-200 shadow"
                  />
                  <button
                    className="absolute bottom-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-2 shadow"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload photo"
                  >
                    <UploadCloud className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handlePhotoChange}
                    title="Upload profile photo"
                    placeholder="Choose a profile photo"
                  />
                </div>
                <span className="text-xs text-zinc-500">Profile Photo</span>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">Name</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
                    placeholder="Your name"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 font-semibold mb-1">Email</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
                    placeholder="Your email"
                    value={profile.email}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-zinc-700 font-semibold mb-1">Age</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
                      placeholder="Age"
                      value={profile.age}
                      onChange={e => setProfile(p => ({ ...p, age: e.target.value }))}
                      type="number"
                      min={0}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="gender-select" className="block text-zinc-700 font-semibold mb-1">Gender</label>
                    <select
                      id="gender-select"
                      className="w-full px-4 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
                      value={profile.gender}
                      onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button className="self-end bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold px-8 py-3 rounded-xl text-lg shadow-lg transition-all">Save Changes</button>
          </div>
        )}
        {/* App Preferences */}
        {tab === "preferences" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="theme-select" className="block text-zinc-700 font-semibold mb-1">Theme</label>
                <select
                  id="theme-select"
                  className="w-full px-4 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
                >
                  <option>System</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
              <div>
                <label htmlFor="units-select" className="block text-zinc-700 font-semibold mb-1">Units</label>
                <select
                  id="units-select"
                  className="w-full px-4 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
                >
                  <option>Metric (kg, cm)</option>
                  <option>Imperial (lb, in)</option>
                </select>
              </div>
              <div>
                <label htmlFor="language-select" className="block text-zinc-700 font-semibold mb-1">Language</label>
                <select
                  id="language-select"
                  className="w-full px-4 py-2 rounded-lg border border-yellow-200 bg-white/80 text-zinc-900 font-semibold focus:outline-yellow-400"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
            <button className="self-end bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-bold px-8 py-3 rounded-xl text-lg shadow-lg transition-all">Save Preferences</button>
          </div>
        )}
        {/* About */}
        {tab === "about" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">About Fitra</h2>
            <p className="text-zinc-700 text-lg">Fitra is your all-in-one fitness and wellness companion. Track your workouts, journal your progress, meditate, and manage your nutrition—all in one beautiful app.</p>
            <div className="flex flex-col gap-1 text-zinc-500 text-sm">
              <span>Version: 1.0.0</span>
              <span>© 2025 Fitra. All rights reserved.</span>
              <a href="#" className="text-yellow-500 hover:underline">Privacy Policy</a>
              <a href="#" className="text-yellow-500 hover:underline">Terms of Service</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
