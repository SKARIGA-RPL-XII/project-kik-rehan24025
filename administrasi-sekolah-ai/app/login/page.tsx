"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login berhasil");
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
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
        Login
      </h2>

      <p className="text-sm text-gray-600 mb-6 text-center">
        Masuk ke sistem administrasi sekolah
      </p>

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
        Login
      </button>

      <div className="mt-6 flex justify-between text-sm">
        <a
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Kembali ke Beranda
        </a>

        <a
          href="/register"
          className="text-blue-600 hover:underline"
        >
          Daftar Akun
        </a>
      </div>
    </form>
  </div>
);

}
