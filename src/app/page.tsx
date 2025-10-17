"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white font-sans">
      
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide text-white flex items-center gap-2">
          <span className="text-3xl">🎓</span> School Directory
        </h1>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/addSchool" className="hover:text-pink-300 transition">Add School</Link>
          <Link href="/showSchool" className="hover:text-indigo-300 transition">View Schools</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Floating Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        <div className="max-w-3xl z-10">
          <h2 className="text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl tracking-tight">
            Empowering Education
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Discover, register, and showcase schools with a modern, intuitive interface. Built for clarity, speed, and impact.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/addSchool" className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300">
              ➕ Add School
            </Link>
            <Link href="/showSchool" className="px-6 py-3 bg-white text-pink-700 font-bold rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300">
              📋 View Schools
            </Link>
          </div>
        </div>
      </main>

      {/* Feature Highlights */}
      <section className="px-6 py-12 bg-white/5 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🧠", title: "Smart Validation", desc: "Built-in checks for email, contact, and image uploads." },
            { icon: "⚡", title: "Fast & Responsive", desc: "Optimized for speed across all devices." },
            { icon: "🎨", title: "Bold UI", desc: "Visually striking layouts with modern design." },
          ].map((f, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-white/70 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-sm text-white/70 border-t border-white/20">
        <p>Made by <span className="font-semibold text-white">Ashwani</span> • Powered by Next.js & Tailwind CSS</p>
        <div className="mt-2 flex justify-center gap-4 text-xs">
          <Link href="https://nextjs.org" target="_blank" className="hover:text-white">Next.js</Link>
          <Link href="https://tailwindcss.com" target="_blank" className="hover:text-white">Tailwind CSS</Link>
          <Link href="https://vercel.com" target="_blank" className="hover:text-white">Vercel</Link>
        </div>
      </footer>
    </div>
  );
}
