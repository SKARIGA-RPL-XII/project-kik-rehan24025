"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Send, 
  XCircle, 
  LayoutDashboard, 
  History, 
  Menu, 
  X, 
  GraduationCap, 
  Bell, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  Clock
} from "lucide-react";

export default function RiwayatPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const user = { name: "Budi Santoso", role: "Guru Pengajar" };

  const data = [
    {
      title: "Surat Izin Kegiatan",
      desc: "Pengajuan izin untuk ekstrakurikuler basket di GOR kota.",
      time: "2 jam yang lalu",
      icon: <CheckCircle className="text-green-500" />,
      status: "disetujui",
      color: "green"
    },
    {
      title: "Permohonan Cuti Sakit",
      desc: "Lampiran surat keterangan dokter terlampir dalam sistem.",
      time: "1 hari yang lalu",
      icon: <Clock className="text-orange-500" />,
      status: "menunggu",
      color: "orange"
    },
    {
      title: "Pengajuan Dana Kegiatan",
      desc: "Revisi anggaran diperlukan untuk bagian konsumsi.",
      time: "5 hari yang lalu",
      icon: <XCircle className="text-red-500" />,
      status: "ditolak",
      color: "red"
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] text-slate-800 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} transition-all duration-500 bg-white border-r border-slate-100 flex flex-col z-50`}>
        <div className="p-8 flex items-center gap-4 overflow-hidden whitespace-nowrap">
          <div className="bg-blue-600 w-10 h-10 min-w-[40px] rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="font-black text-xl tracking-tight text-slate-800">SAS<span className="text-blue-600">PRO</span></h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">User Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          <Link href="/dashboard">
            <NavItem icon={<LayoutDashboard size={22} />} label="Dashboard" isOpen={isSidebarOpen} />
          </Link>
          <Link href="/ajukan">
            <NavItem icon={<Send size={22} />} label="Ajukan Surat" isOpen={isSidebarOpen} />
          </Link>
          <NavItem icon={<History size={22} />} label="Riwayat Surat" active isOpen={isSidebarOpen} />
        </nav>

        {isSidebarOpen && (
          <div className="m-6 p-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl text-white relative overflow-hidden group shadow-lg shadow-orange-100">
            <Sparkles className="absolute -right-2 -top-2 opacity-20 group-hover:rotate-12 transition-transform" size={60} />
            <p className="text-xs font-bold opacity-80 mb-1 tracking-wider uppercase">Pro Account</p>
            <p className="text-sm font-black mb-4 leading-tight">Pantau analitik surat lebih detail!</p>
            <button className="bg-white text-orange-600 text-[10px] font-black py-2 px-4 rounded-xl uppercase tracking-widest hover:bg-orange-50 transition-colors shadow-sm">
              Upgrade
            </button>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex justify-between items-center z-40">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
              <Menu size={20} />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-xl font-black text-slate-800">Riwayat Aktivitas</h1>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <History size={12} className="text-blue-500" /> Log Jejak Digital Surat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 pl-8 border-l border-slate-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-black text-slate-800 leading-none mb-1">{user.name}</p>
                <div className="flex items-center justify-end gap-1">
                  <ShieldCheck size={10} className="text-blue-500" />
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{user.role}</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center text-white font-black text-xl border-2 border-white ring-1 ring-slate-100">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari riwayat pengajuan..." 
                  className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                <Filter size={16} /> Filter Status
              </button>
            </div>

            {/* List Activity (Staggered Animation) */}
            <div className="space-y-4">
              {data.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-xl hover:shadow-blue-900/5 transition-all"
                >
                  <div className="flex items-center gap-6 w-full">
                    {/* Icon Status */}
                    <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-6 transition-transform
                      ${item.status === 'disetujui' ? 'bg-green-50 text-green-500' : 
                        item.status === 'menunggu' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'}`}
                    >
                      {item.icon}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">{item.title}</h3>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm text-slate-400 font-medium line-clamp-1">{item.desc}</p>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span>ID: SAS-00{i+1}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white">
                      Detail <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="flex justify-center pt-8">
              <button className="px-10 py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:border-blue-300 hover:text-blue-500 transition-all">
                Muat Lebih Banyak
              </button>
            </div>

            <footer className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] py-10">
              © 2026 SAS Digital System • Activity Logger
            </footer>
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

// Komponen NavItem (Konsisten dengan Dashboard & Ajukan)
const NavItem = ({ icon, label, active = false, isOpen }: any) => (
  <div className={`
    flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative group
    ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}
  `}>
    <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</div>
    {isOpen && <span className="text-sm font-black tracking-wide leading-none">{label}</span>}
  </div>
);

// Komponen StatusBadge Mewah
function StatusBadge({ status }: { status: string }) {
  const config: any = {
    disetujui: { bg: "bg-green-500 text-white", label: "Approved" },
    menunggu: { bg: "bg-orange-500 text-white", label: "Pending" },
    ditolak: { bg: "bg-red-500 text-white", label: "Rejected" },
  };

  const style = config[status.toLowerCase()] || config.menunggu;

  return (
    <div className={`px-2.5 py-0.5 rounded-lg font-black text-[8px] uppercase tracking-tighter ${style.bg} shadow-sm`}>
      {style.label}
    </div>
  );
}