"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

//http://localhost:3000/addSchool

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
      fd.append("page", data.input[0]);
      await axios.post("/api/addBook", fd, {
        withCredentials: true, // send cookies if session-based
      });
      
      setMessage(res.data?.message || "Submitted successfully");
      reset(); setPreview(null);
    } catch (err) {
      const server = err?.response?.data;
      if (server?.fieldErrors) {
        Object.entries(server.fieldErrors).forEach(([f, m]) => setError(f, { type: "server", message: m }));
        setMessage(Object.values(server.fieldErrors)[0]);
      } else setMessage(server?.error || err.message || "Error submitting form.");
      console.error("Submit error:", err);
    } finally { setLoading(false); }
  };

  const fileOnChange = (e) => { const f = e.target.files?.[0]; if (f) setPreview(URL.createObjectURL(f)); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-6">
      <div className="w-full max-w-xl">
        <div className="relative mb-6">
          <div className="absolute -inset-0.5 rounded-2xl blur-lg opacity-60 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400"></div>
          <div className="relative bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md p-6 shadow-2xl">
            <header className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white text-indigo-700 font-extrabold text-xl shadow-inner">S</div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">Add School</h1>
                <p className="text-sm text-white/70">Add a school with bold, clear fields</p>
              </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <label className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-indigo-700">School Name</span>
                  {errors.name && <span className="text-sm text-red-500">{errors.name.message ?? "Required"}</span>}
                </label>
                <input {...register("name", { required: "Name is required." })} placeholder="e.g., St. Xavier High School" className="w-full bg-white rounded-md p-3 border-2 border-transparent focus:border-indigo-400 placeholder:text-gray-400 text-gray-900" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-xl p-3 shadow-lg">
                  <label className="text-sm font-semibold text-indigo-700 mb-2 block">Address</label>
                  {errors.address && <div className="text-sm text-red-500 mb-1">{errors.address.message}</div>}
                  <input {...register("address", { required: "Address is required." })} placeholder="Street, landmark" className="w-full bg-white rounded-md p-3 border-2 border-transparent focus:border-indigo-400 placeholder:text-gray-400 text-gray-900" />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-xl p-3 shadow-lg">
                    <label className="text-sm font-semibold text-indigo-700 mb-2 block">City</label>
                    {errors.city && <div className="text-sm text-red-500 mb-1">{errors.city.message}</div>}
                    <input {...register("city", { required: "City is required." })} placeholder="City" className="w-full bg-white rounded-md p-3 border-2 border-transparent focus:border-indigo-400 placeholder:text-gray-400 text-gray-900" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-3 shadow-lg">
                    <label className="text-sm font-semibold text-indigo-700 mb-2 block">State</label>
                    {errors.state && <div className="text-sm text-red-500 mb-1">{errors.state.message}</div>}
                    <input {...register("state", { required: "State is required." })} placeholder="State" className="w-full bg-white rounded-md p-3 border-2 border-transparent focus:border-indigo-400 placeholder:text-gray-400 text-gray-900" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-xl p-3 shadow-lg">
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-indigo-700">Contact Number</span>
                    {errors.contact && <span className="text-sm text-red-500">{errors.contact.message ?? "10 digits"}</span>}
                  </label>
                  <input {...register("contact", { required: "Contact number is required.", pattern: { value: mobilePattern, message: "Contact must be a 10-digit number." } })} placeholder="9876543210" inputMode="numeric" className="w-full bg-white rounded-md p-3 border-2 border-transparent focus:border-indigo-400 placeholder:text-gray-400 text-gray-900" />
                </div>

                <div className="bg-white rounded-xl p-3 shadow-lg">
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-indigo-700">Email</span>
                    {errors.email_id && <span className="text-sm text-red-500">{errors.email_id.message ?? "Invalid"}</span>}
                  </label>
                  <input {...register("email_id", { required: "Email is required.", pattern: { value: emailPattern, message: "Enter a valid email address." } })} placeholder="example@school.edu" className="w-full bg-white rounded-md p-3 border-2 border-transparent focus:border-indigo-400 placeholder:text-gray-400 text-gray-900" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-lg">
                <label className="text-sm font-semibold text-indigo-700 mb-2 block">School Image</label>
                <label className="flex items-center justify-between gap-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-2 bg-indigo-600 text-white rounded-md font-semibold">Choose</div>
                    <span className="text-sm text-gray-600">PNG, JPG or JPEG</span>
                  </div>
                  <input type="file" accept="image/png, image/jpeg" {...register("image", { required: "Image is required.", onChange: fileOnChange })} className="hidden" />
                </label>
                {errors.image && <div className="text-sm text-red-500 mt-2">{errors.image.message}</div>}
                {preview && <div className="mt-3 rounded overflow-hidden border-2 border-indigo-100 shadow-inner"><img src={preview} alt="preview" className="w-full h-44 object-cover" /></div>}
              </div>

              <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl text-white font-extrabold transition transform ${loading ? "bg-indigo-300 cursor-not-allowed scale-100" : "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:scale-[1.01] shadow-lg"}`}>{loading ? "Submitting..." : "Add School"}</button>

              {message && <div className={`mt-2 text-center rounded-md py-2 font-medium ${/error|invalid|required/i.test(message) ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800"}`}>{message}</div>}
            </form>
          </div>
        </div>

        <footer className="text-center text-sm text-white/80 mt-2"><span className="font-medium">Tip</span> — Use a clear school logo image for best results.</footer>
      </div>
    </div>
  );
}
// http://localhost:3000/addSchool