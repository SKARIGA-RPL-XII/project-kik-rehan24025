"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, School, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  // --- LOGIKA ASLI (TIDAK DIUBAH) ---
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
  // --- END LOGIKA ASLI ---

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] relative overflow-hidden">
      
      {/* Dekorasi Background Bulatan (Aksen Biru & Oranye) */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-4xl min-h-[550px] bg-white rounded-[30px] shadow-2xl overflow-hidden z-10 mx-4"
      >
        {/* SISI KIRI: Visual & Info (Biru ke Oranye Gradient) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500 p-12 text-white flex-col justify-between relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">ASAI</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Bergabunglah dengan <br /> Adminitrasi sekolah ai.
            </h2>
            <p className="text-blue-100 leading-relaxed">
              Kelola persuratan dan administrasi sekolah jadi lebih praktis, otomatis, dan cerdas dengan asisten AI.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="p-3 bg-orange-400 rounded-xl">
              <School className="text-white" />
            </div>
            <div>
              <p className="text-xs text-orange-100 uppercase font-bold tracking-wider">Terpercaya</p>
              <p className="text-sm">Digunakan oleh 500+ Sekolah</p>
            </div>
          </div>

          {/* Pola Dekorasi Halus */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
          </div>
        </div>

        {/* SISI KANAN: Form Register (Putih Bersih) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-3xl font-extrabold text-blue-900 mb-2">Register</h3>
            <p className="text-gray-500">Buat akun admin untuk akses portal sekolah.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Masukkan nama lengkap"
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Sekolah</label>
              <input
                type="email"
                required
                placeholder="admin@sekolah.sch.id"
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:scale-[1.01] active:scale-[0.98] mt-4"
            >
              Daftar Sekarang
            </button>
          </form>

          {/* Navigasi Bawah */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
            <Link href="/login" className="text-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Sudah punya akun? <span className="font-bold text-blue-600 underline underline-offset-4">Login di sini</span>
            </Link>
            
            <Link href="/" className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-orange-500 transition-colors">
              <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}