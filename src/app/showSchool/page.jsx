"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

//http://localhost:3000/showSchool

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get("/api/addSchool")
      .then((res) => {
        if (!mounted) return;
        setSchools(Array.isArray(res.data?.schools) ? res.data.schools : []);
      })
      .catch((err) => {
        console.error("Fetch schools error:", err);
        setError(err?.response?.data?.error || err.message || "Failed to load schools");
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return schools;
    return schools.filter(s =>
      String(s.name || "").toLowerCase().includes(q) ||
      String(s.contact || "").toLowerCase().includes(q) ||
      String(s.email_id || "").toLowerCase().includes(q)
    );

  }, [schools, query]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Schools</h1>
            <p className="text-sm text-white/80">List of registered schools (name, email, contact)</p>
          </div>

          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email or contact"
              className="px-3 py-2 rounded-md w-64 sm:w-80 bg-white/90 placeholder:text-gray-500 text-gray-900 focus:outline-none"
            />
            <button
              onClick={() => { setQuery(""); }}
              className="px-3 py-2 rounded-md bg-white/10 text-white border border-white/20"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          {loading ? (
            <div className="py-14 text-center text-white/80">Loading schools...</div>
          ) : error ? (
            <div className="py-8 text-center text-red-200">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-white/80">No schools found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-sm text-white/80 border-b border-white/10">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4 hidden sm:table-cell">Email</th>
                    <th className="py-3 px-4">Contact</th>
                  </tr>
                </thead>
                <tbody>
  {filtered.map((s) => (
    <tr key={s.id} className="hover:bg-white/5 even:bg-white/2">
      <td className="py-3 px-4 align-top flex gap-4 items-start">
        <img
          src={s.image ? s.image : "/default-school.png"}
          onError={(e) => { e.target.src = "/default-school.png"; }}
          alt={s.name}
          className="w-16 h-16 object-cover rounded-md border border-white/20 shadow-sm"
        />
        <div>
          <div className="text-white font-semibold">{s.name}</div>
          <div className="text-sm text-white/60 mt-1 hidden sm:block">{s.address ?? ""}</div>
        </div>
      </td>
      <td className="py-3 px-4 hidden sm:table-cell">
        <div className="text-white/90">{s.email_id}</div>
      </td>
      <td className="py-3 px-4">
        <div className="text-white/90">{s.contact}</div>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          )}
        </div>

        <footer className="mt-6 text-sm text-white/80 text-center">Showing {filtered.length} of {schools.length} schools</footer>
      </div>
    </div>
  );
}
