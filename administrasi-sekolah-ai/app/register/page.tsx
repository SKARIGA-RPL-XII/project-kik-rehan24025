"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
  <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">

    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md
      hover:shadow-2xl transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">
        Register
      </h2>

      <p className="text-sm text-gray-600 mb-6 text-center">
        Buat akun baru untuk masuk ke sistem
      </p>

      <input
        placeholder="Nama Lengkap"
        required
        className="w-full mb-4 p-3 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        type="email"
        required
        className="w-full mb-4 p-3 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        required
        className="w-full mb-6 p-3 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl
        hover:bg-blue-700 hover:scale-[1.02]
        transition-all duration-300"
      >
        Register
      </button>

      <div className="mt-6 flex justify-between text-sm">
        <a
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Kembali ke Beranda
        </a>

        <a
          href="/login"
          className="text-blue-600 hover:underline"
        >
          Sudah punya akun?
        </a>
      </div>
    </form>
  </div>
);

}
