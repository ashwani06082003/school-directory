"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-4">School Directory</h1>
      <p className="text-white/80 mb-8 text-center max-w-md">
        Welcome! You can add a new school or view the list of registered schools below.
      </p>
      <div className="flex gap-6">
        <Link href="/addSchool" className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow hover:scale-105 transition">
          Add School
        </Link>
        <Link href="/showSchool" className="px-6 py-3 bg-white text-pink-700 font-bold rounded-xl shadow hover:scale-105 transition">
          View Schools
        </Link>
      </div>
    </div>
  );
}
