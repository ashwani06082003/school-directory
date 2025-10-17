"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from "next/link"; //navbar links

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const emailPattern = /^\S+@\S+\.\S+$/i;
  const mobilePattern = /^[0-9]{10}$/;

  const onSubmit = async (data) => {
    setMessage("");
    if (!data.image || !data.image[0]) {
      setError("image", { type: "required", message: "Please choose an image." });
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      ["name", "address", "city", "state", "contact", "email_id"].forEach(k => fd.append(k, data[k] ?? ""));
      fd.append("image", data.image[0]);
      const res = await axios.post("/api/addSchool", fd, { withCredentials: true });
      setMessage(res.data?.message || "Submitted successfully");
      reset(); setPreview(null);
    } catch (err) {
      const server = err?.response?.data;
      if (err.response?.status === 409) {
        setMessage("A school with this email or contact already exists.");
      } else if (server?.fieldErrors) {
        Object.entries(server.fieldErrors).forEach(([f, m]) => setError(f, { type: "server", message: m }));
        setMessage(Object.values(server.fieldErrors)[0]);
      } else {
        setMessage(server?.error || err.message || "Error submitting form.");
      }
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fileOnChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      
      {/* Navbar here */}
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

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="relative mb-8">
            <div className="absolute -inset-1 rounded-2xl blur-xl opacity-50 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-8 shadow-2xl">
              <header className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white text-indigo-700 font-extrabold text-xl shadow-inner">S</div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Add School</h1>
                  <p className="text-sm text-white/70">Fill in the details to register a school</p>
                </div>
              </header>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {[
                  { name: "name", label: "School Name", placeholder: "e.g., St. Xavier High School", required: true },
                  { name: "address", label: "Address", placeholder: "Street, landmark", required: true },
                  { name: "city", label: "City", placeholder: "City", required: true },
                  { name: "state", label: "State", placeholder: "State", required: true },
                  { name: "contact", label: "Contact Number", placeholder: "9876543210", required: true, pattern: mobilePattern, patternMsg: "Contact must be a 10-digit number." },
                  { name: "email_id", label: "Email", placeholder: "example@school.edu", required: true, pattern: emailPattern, patternMsg: "Enter a valid email address." }
                ].map(({ name, label, placeholder, required, pattern, patternMsg }) => (
                  <div key={name} className="bg-white rounded-xl p-4 shadow-lg">
                    <label className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-indigo-700">{label}</span>
                      {errors[name] && <span className="text-sm text-red-500">{errors[name].message}</span>}
                    </label>
                    <input
                      {...register(name, {
                        required: required && `${label} is required.`,
                        pattern: pattern && { value: pattern, message: patternMsg }
                      })}
                      placeholder={placeholder}
                      className="w-full bg-white rounded-md p-3 border-2 border-transparent focus:border-indigo-400 placeholder:text-gray-400 text-gray-900"
                    />
                  </div>
                ))}

                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <label className="text-sm font-semibold text-indigo-700 mb-2 block">School Image</label>
                  <label className="flex items-center justify-between gap-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-2 bg-indigo-600 text-white rounded-md font-semibold">Choose</div>
                      <span className="text-sm text-gray-600">PNG, JPG or JPEG</span>
                    </div>
                    <input type="file" accept="image/png, image/jpeg" {...register("image", { required: "Image is required.", onChange: fileOnChange })} className="hidden" />
                  </label>
                  {errors.image && <div className="text-sm text-red-500 mt-2">{errors.image.message}</div>}
                  {preview && (
                    <div className="mt-4 rounded overflow-hidden border-2 border-indigo-100 shadow-inner">
                      <img src={preview} alt="preview" className="w-full h-48 object-cover" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl text-white font-bold tracking-wide transition transform ${
                    loading
                      ? "bg-indigo-300 cursor-not-allowed scale-100"
                      : "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:scale-[1.02] shadow-lg"
                  }`}
                >
                  {loading ? "Submitting..." : "Add School"}
                </button>

                {message && (
                  <div className={`mt-4 text-center rounded-md py-2 font-medium ${
                    /error|invalid|required/i.test(message)
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>

          <footer className="text-center text-sm text-white/80 mt-2">
            <span className="font-medium">Tip</span> — Use a clear school logo image for best results.
          </footer>
        </div>
      </div>
    </div>
  );
}
