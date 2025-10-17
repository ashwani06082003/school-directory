"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link"; 
const dummySchools = [
  {
    id: "CMS",
    name: "City Montessori School",
    address: "RDSO, Manak Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "05222453546",
    email_id: "rdso@cmseducation.org",
    image: "/images/CMS.jpeg",
  },
  {
    id: "LaMartiniere",
    name: "La Martiniere College",
    address: "Constantia, Martin Purwa",
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "0522-2621856",
    email_id: "info@lamartinierelucknow.org",
    image: "/images/La_Martiniere_87.jpg",
  },
  {
    id: "DPS",
    name: "Delhi Public School",
    address: "Shaheed Path, Gomti Nagar Extension",
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "8601444408",
    email_id: "dpsshaheedpath@gmail.com",
    image: "/images/DPS.jpeg",
  },
  {
    id: "Jaipuria",
    name: "Seth M.R. Jaipuria School",
    address: "Shaheed Path, Near HCL IT City",
    city: "Lucknow",
    state: "Uttar Pradesh",
    contact: "8810756956",
    email_id: "admissions@jaipurialucknow.edu.in",
    image: "/images/Jaipuria.jpeg",
  },
];

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    axios.get("/api/addSchool")
      .then(res => {
        const fetched = Array.isArray(res.data?.schools) ? res.data.schools : [];
        mounted && setSchools(fetched.length ? fetched : dummySchools);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        mounted && setSchools(dummySchools);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? schools.filter(s =>
          (s.name || "").toLowerCase().includes(q) ||
          (s.contact || "").toLowerCase().includes(q) ||
          (s.email_id || "").toLowerCase().includes(q)
        )
      : schools;
  }, [schools, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      
      {/*Navbar here */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md">
        <Link href="/" className="text-2xl font-bold tracking-wide text-white flex items-center gap-2">
          🎓 School Directory
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/addSchool" className="hover:text-pink-300 transition">Add School</Link>
          <Link href="/showSchool" className="hover:text-indigo-300 transition">View Schools</Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">🏫 School Directory</h1>
            <p className="text-sm text-white/70 mt-1">Browse registered schools with contact and location details</p>
          </div>
          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, email or contact"
              className="px-4 py-2 rounded-md w-64 sm:w-80 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none"
            />
            <button onClick={() => setQuery("")} className="px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/20 transition">Clear</button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-white/80 text-lg">Loading schools...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-white/80 text-lg">No schools found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(s => (
              <div key={s.id} className="bg-white/10 rounded-xl p-4 shadow-md hover:shadow-lg transition">
                <img
                  src={s.image || "/default-school.png"}
                  onError={e => { e.target.src = "/default-school.png"; }}
                  alt={s.name}
                  className="w-full h-40 object-cover rounded-md mb-4 border border-white/20"
                />
                <h2 className="text-xl font-semibold">{s.name}</h2>
                <p className="text-sm text-white/70 mt-1">{s.address}, {s.city}</p>
                <div className="mt-3 text-sm">
                  <p><span className="font-medium">📧</span> {s.email_id}</p>
                  <p><span className="font-medium">📞</span> {s.contact}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-10 text-sm text-white/70 text-center">
          Showing {filtered.length} of {schools.length} schools
        </footer>
      </div>
    </div>
  );
}
