"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function LoginPage() {
  const router = useRouter();
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // --- LOGIKA DIPERBARUI (DENGAN ANIMASI ALERT) ---
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Notifikasi Berhasil (Centang)
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: "Mengarahkan Anda ke dashboard...",
          showConfirmButton: false, // Tidak perlu diklik
          timer: 1500, // Hilang dalam 1.5 detik
          timerProgressBar: true,
          background: "#fff",
          iconColor: "#00d27a",
          customClass: {
            popup: "rounded-[25px]",
            title: "font-black text-blue-900",
          }
        });

        // Redirect otomatis setelah animasi selesai
        setTimeout(() => {
          if (data.role?.toLowerCase() === "admin") {
            router.push("/admin"); 
          } else {
            router.push("/dashboard");
          }
        }, 1600);

      } else {
        // Notifikasi Gagal
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.message || "Email atau password salah",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: "#fff",
          iconColor: "#ef4444",
          customClass: {
            popup: "rounded-[25px]",
            title: "font-black text-red-600",
          }
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Terjadi Kesalahan",
        text: "Koneksi server bermasalah",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF] relative overflow-hidden font-sans">
      
      {/* Dekorasi Background */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-4xl min-h-[550px] bg-white rounded-[30px] shadow-2xl overflow-hidden z-10 mx-4"
      >
        {/* SISI KIRI: Welcome Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 p-12 text-white flex-col justify-between relative">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-all">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                <Cpu className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">ASAI</span>
            </Link>
            
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Selamat Datang <br /> Kembali!
            </h1>
            <p className="text-blue-100 leading-relaxed text-lg">
              Masukkan kredensial Anda untuk melanjutkan akses ke sistem administrasiai sekolah cerdas.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-black/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="p-3 bg-blue-400 rounded-xl">
              <ShieldCheck className="text-white" />
            </div>
            <div>
              <p className="text-xs text-blue-100 uppercase font-bold tracking-wider">Keamanan</p>
              <p className="text-sm italic">Sesi Anda terenkripsi aman</p>
            </div>
          </div>

          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg width="100%" height="100%"><pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="#fff" /></pattern><rect width="100%" height="100%" fill="url(#pattern-circles)" /></svg>
          </div>
        </div>

        {/* SISI KANAN: Form Login */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-blue-900 mb-2 uppercase tracking-tight">Sign In</h2>
            <p className="text-gray-500 text-sm tracking-widest uppercase">To Access The Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-900 uppercase ml-1">Email / Username</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-4 flex items-center text-blue-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter User Name Here"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 text-gray-700"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-blue-900 uppercase ml-1">Password</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-4 flex items-center text-blue-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="Enter Password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 text-gray-700"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-blue-500 hover:text-orange-500 transition-colors">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00d27a] hover:bg-[#00bc6d] active:scale-95'} text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 hover:shadow-green-200 transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : "Login"}
            </button>
          </form>

          {/* Navigasi Bawah */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col gap-4">
            <Link href="/register" className="text-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Belum punya akun? <span className="font-bold text-orange-500 hover:underline">Daftar Sekarang</span>
            </Link>
            
            <Link href="/" className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-blue-600 transition-colors font-medium">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 text-gray-400 text-[10px] tracking-widest uppercase">
        Copyright © 2026 EduAdminAI Tech Ltd. All rights reserved.
      </div>

      {/* Style Tambahan untuk SweetAlert agar sesuai tema */}
      <style jsx global>{`
        .swal2-popup {
          font-family: 'Inter', sans-serif !important;
          padding: 2rem !important;
        }
        .swal2-timer-progress-bar {
          background: #00d27a !important;
        }
      `}</style>
    </div>
  );
}