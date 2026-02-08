"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, Users, FileText, LayoutDashboard, 
  Search, Bell, Settings, LogOut, Menu,
  TrendingUp, Clock, ShieldCheck, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);

  // --- Ambil Data User dari Database ---
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleLogout = () => {
    // Tambahkan logika hapus token/session jika perlu
    router.push("/login");
  };

  // --- Animasi Variants ---
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  // Loading state jika data user belum ada
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex font-sans text-slate-700">
      
      {/* --- SIDEBAR (Kiri) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col z-50 shadow-xl shadow-blue-900/5"
          >
            <div className="p-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-800">Edu<span className="text-blue-600">Admin</span></span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 px-4">Navigation</p>
              <button className="w-full flex items-center justify-between px-4 py-3.5 bg-blue-50 text-blue-600 rounded-2xl font-bold transition-all">
                <div className="flex items-center gap-3"><LayoutDashboard size={20} /> Dashboard</div>
                <ChevronRight size={14} />
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">
                <Users size={20} /> Data Pengguna
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">
                <FileText size={20} /> Arsip Surat
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">
                <Activity size={20} /> Log Aktivitas
              </button>
            </nav>

            {/* Tombol Logout di Bawah Sidebar (Menggantikan Kartu Upgrade) */}
            <div className="p-6 mt-auto">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-red-50 text-red-500 font-black uppercase text-xs tracking-widest hover:bg-red-100 rounded-2xl transition-all shadow-sm border border-red-100"
              >
                <LogOut size={18} /> Logout Akun
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* --- CONTENT AREA (Kanan) --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar Content */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full w-80">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Cari fitur atau data..." className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 leading-none">{user.name}</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">
                  {user.role_name || "Administrator"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-blue-600 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=4f46e5&color=fff`} alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* Welcome Section */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[3px] mb-1">Main Dashboard</h2>
            <h1 className="text-4xl font-black text-slate-900 leading-tight">Halo, Selamat Datang {user.name.split(' ')[0]}! 👋</h1>
          </div>

          {/* Quick Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: "Surat Masuk", val: "350", desc: "Request tertunda", icon: <FileText />, color: "bg-blue-600" },
                { label: "Total Pengguna", val: "1,240", desc: "Siswa & Staf", icon: <Users />, color: "bg-green-500" },
                { label: "Uptime Sistem", val: "99.9%", desc: "Status Normal", icon: <Activity />, color: "bg-orange-500" },
                { label: "Task Selesai", val: "145", desc: "Minggu ini", icon: <ShieldCheck />, color: "bg-purple-500" }
              ].map((stat, i) => (
               <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-xl hover:shadow-blue-900/5 transition-all"
               >
                 <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                   {stat.icon}
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-400 uppercase mb-1">{stat.label}</p>
                   <h3 className="text-2xl font-black text-slate-800">{stat.val}</h3>
                   <p className="text-[10px] text-slate-400 font-medium">{stat.desc}</p>
                 </div>
               </motion.div>
              ))}
          </div>

          {/* FITUR UTAMA */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            
            {/* MONITORING */}
            <motion.div whileHover={{ y: -10 }} variants={itemVars} initial="hidden" animate="show">
              <Card className="rounded-[32px] border-none shadow-sm hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden h-full" onClick={() => router.push("/admin/monitoring")}>
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-120 group-hover:rotate-12 transition-transform">
                  <Activity size={100} className="text-orange-500" />
                </div>
                <CardHeader className="pt-10 pb-4 relative z-10">
                  <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                    <Activity size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Pantau kesehatan server, log audit AI, dan performa sistem administrasi secara real-time.
                  </p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl py-6 shadow-lg shadow-orange-100">
                    Masuk Panel <ChevronRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* KELOLA USER */}
            <motion.div whileHover={{ y: -10 }} variants={itemVars} initial="hidden" animate="show">
              <Card className="rounded-[32px] border-none shadow-sm hover:shadow-2xl transition-all cursor-pointer group h-full" onClick={() => router.push("/admin/users")}>
                <CardHeader className="pt-10 pb-4">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Users size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">Kelola User</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Atur manajemen hak akses siswa, guru, dan admin. Tambah atau bekukan akun secara instan.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl py-6 shadow-lg shadow-blue-100">
                    Kelola Sekarang <ChevronRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* KELOLA SURAT */}
            <motion.div whileHover={{ y: -10 }} variants={itemVars} initial="hidden" animate="show">
              <Card className="rounded-[32px] border-none shadow-sm hover:shadow-2xl transition-all cursor-pointer group h-full" onClick={() => router.push("/admin/surat")}>
                <CardHeader className="pt-10 pb-4">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-6">
                    <FileText size={28} />
                  </div>
                  <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">Kelola Surat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Verifikasi persuratan digital dan manajemen arsip cerdas yang diatur otomatis oleh sistem.
                  </p>
                  <Button className="w-full bg-slate-900 hover:bg-black text-white font-black rounded-xl py-6 shadow-lg shadow-slate-200">
                    Buka Arsip <ChevronRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <footer className="mt-auto py-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest border-t border-slate-100">
            © 2026 EDUADMIN AI SYSTEM • ALL RIGHTS RESERVED
          </footer>
        </div>
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}