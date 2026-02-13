"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Icon Imports
import { 
  Activity, Users, LayoutDashboard, Menu, 
  LogOut, Search, Bell, RefreshCw, Cpu, 
  Database, Plus, Trash2, FileText 
} from "lucide-react";

export default function LogAktivitasPage() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock data user (biasanya didapat dari context/session)
  const user = {
    name: "Admin Utama",
    role_name: "Super Admin"
  };

  // Log data dummy
  const logs = [
    { id: 1, user: "Admin Utama", action: "Mengedit data pengguna", target: "Budi Santoso", time: "2 menit yang lalu", type: "edit" },
    { id: 2, user: "Guru - Budi", action: "Membuat surat baru via AI", target: "Surat Izin Ekskul", time: "15 menit yang lalu", type: "create" },
    { id: 3, user: "Sistem", action: "Backup Database Otomatis", target: "Server Cloud", time: "1 jam yang lalu", type: "system" },
    { id: 4, user: "Admin Utama", action: "Menghapus pengajuan surat", target: "ID #9921", time: "3 jam yang lalu", type: "delete" },
  ];

  const handleLogout = () => {
    // Logika logout Anda di sini
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -250 }} animate={{ x: 0 }} exit={{ x: -250 }}
            className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col z-50 shadow-xl shadow-blue-900/5"
          >
            <div className="p-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-800">
                Control<span className="text-blue-600">Admin</span>
              </span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 px-4">Navigation</p>
              <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
              <SidebarLink href="/admin/pengguna" icon={Users} label="Data Pengguna" />
              <SidebarLink href="/admin/arsip" icon={FileText} label="Arsip Surat" />
              <SidebarLink href="/admin/logs" icon={Activity} label="Log Aktivitas" active />
            </nav>

            <div className="p-6 mt-auto">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-red-50 text-red-500 font-black uppercase text-xs tracking-widest hover:bg-red-100 rounded-2xl transition-all border border-red-100"
              >
                <LogOut size={18} /> Logout Akun
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full w-80 shadow-inner border border-slate-200">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Cari data database..." className="bg-transparent border-none outline-none text-sm w-full" />
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
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{user.role_name}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-blue-600 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=4f46e5&color=fff`} alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-black text-slate-800">Monitoring Sistem</h2>
              <p className="text-slate-500 text-sm">Pantau jejak aktivitas dan performa server secara real-time.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Cpu className="text-blue-600" />} label="Status Server" value="Optimal" sub="CPU Usage: 12%" />
                <StatCard icon={<Database className="text-purple-600" />} label="Database" value="Tersinkron" sub="Last Backup: 1h ago" />
                <StatCard icon={<RefreshCw className="text-orange-600" />} label="Aktivitas" value="482" sub="Hari ini" />
            </div>

            {/* LOG CARD */}
            <Card className="border-none shadow-xl shadow-blue-900/5 rounded-[24px] overflow-hidden bg-white">
              <CardHeader className="border-b border-slate-50 p-6">
                <CardTitle className="flex items-center justify-between text-slate-800 font-black text-lg">
                  <div className="flex items-center gap-3">
                    <Activity size={24} className="text-blue-600" />
                    Jejak Aktivitas Sistem
                  </div>
                  <span className="bg-blue-50 text-blue-600 text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-black">
                    Live Update
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                  {logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      whileHover={{ x: 10, backgroundColor: "#F8FAFC" }}
                      className="p-6 flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                          log.type === 'edit' ? 'bg-orange-50 text-orange-500' :
                          log.type === 'create' ? 'bg-green-50 text-green-500' :
                          log.type === 'delete' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                        }`}>
                          <LogIcon type={log.type} />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 leading-none mb-1.5">{log.user}</p>
                          <p className="text-sm text-slate-500 font-medium tracking-tight">
                            {log.action}: <span className="text-blue-600 font-bold">{log.target}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{log.time}</p>
                        <div className="flex justify-end">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Footer Action */}
            <div className="flex justify-center pt-4">
               <button className="px-10 py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:border-blue-300 hover:text-blue-500 transition-all">
                Unduh Laporan Log (.CSV)
              </button>
            </div>
          </div>
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

// --- Komponen Pendukung Seragam ---

const SidebarLink = ({ href, icon: Icon, label, active = false }: any) => (
  <Link href={href}>
    <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group
      ${active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}
    `}>
      <Icon size={20} className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
      <span className="font-bold text-sm tracking-tight">{label}</span>
    </div>
  </Link>
);

const StatCard = ({ icon, label, value, sub }: any) => (
  <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5">
    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
        {icon}
    </div>
    <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-xl font-black text-slate-800 leading-none mb-1">{value}</p>
        <p className="text-[10px] text-slate-400 font-bold">{sub}</p>
    </div>
  </div>
);

const LogIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'edit': return <RefreshCw size={20} />;
    case 'create': return <Plus size={20} />;
    case 'delete': return <Trash2 size={20} />;
    default: return <Activity size={20} />;
  }
};