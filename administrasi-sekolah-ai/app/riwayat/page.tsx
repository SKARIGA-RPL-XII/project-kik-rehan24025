"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, Send, XCircle, LayoutDashboard, History, Menu, X, 
  GraduationCap, Bell, MessageSquare, Sparkles, ChevronRight, 
  ShieldCheck, Search, Filter, ArrowUpRight, Clock, LogOut, 
  User as UserIcon, Calendar, FileText, Info
} from "lucide-react";

export default function RiwayatPage() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // --- STATE UNTUK MODAL DETAIL ---
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- AMBIL DATA USER ---
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  // --- LOGIKA CLOSE DROPDOWN SAAT CLICK LUAR ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  const data = [
    {
      id: "SAS-001",
      title: "Surat Izin Kegiatan",
      desc: "Pengajuan izin untuk ekstrakurikuler basket di GOR kota.",
      fullDesc: "Surat permohonan izin penggunaan lapangan GOR Kota untuk kegiatan seleksi tim basket sekolah yang akan dilaksanakan pada tanggal 20 Februari 2026. Seluruh berkas proposal telah dilampirkan.",
      time: "2 jam yang lalu",
      date: "12 Feb 2026",
      icon: <CheckCircle className="text-green-500" />,
      status: "disetujui",
      color: "green"
    },
    {
      id: "SAS-002",
      title: "Permohonan Cuti Sakit",
      desc: "Lampiran surat keterangan dokter terlampir dalam sistem.",
      fullDesc: "Permohonan cuti sakit atas nama siswa yang bersangkutan untuk durasi 3 hari. Surat keterangan dari RSUD telah diunggah ke dalam sistem sebagai bukti otentik.",
      time: "1 hari yang lalu",
      date: "11 Feb 2026",
      icon: <Clock className="text-orange-500" />,
      status: "menunggu",
      color: "orange"
    },
    {
      id: "SAS-003",
      title: "Pengajuan Dana Kegiatan",
      desc: "Revisi anggaran diperlukan untuk bagian konsumsi.",
      fullDesc: "Pengajuan anggaran untuk acara HUT Sekolah ke-25. Ditolak sementara karena rincian biaya konsumsi dianggap terlalu tinggi dan perlu dilakukan penyesuaian ulang oleh panitia.",
      time: "5 hari yang lalu",
      date: "07 Feb 2026",
      icon: <XCircle className="text-red-500" />,
      status: "ditolak",
      color: "red"
    },
  ];

  if (!user) return null;

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
            <div className="flex items-center gap-4 pl-8 border-l border-slate-100 relative" ref={dropdownRef}>
              <div className="text-right hidden md:block">
                <p className="text-sm font-black text-slate-800 leading-none mb-1">{user.name}</p>
                <div className="flex items-center justify-end gap-1">
                  <ShieldCheck size={10} className="text-blue-500" />
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{user.role_name || "User"}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center text-white font-black text-xl border-2 border-white ring-1 ring-slate-100 hover:scale-105 transition-transform"
              >
                {user.name.charAt(0)}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-16 w-56 bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 p-2 z-[60]"
                  >
                    <div className="p-4 border-b border-slate-50 mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-xs font-black text-slate-800 truncate">{user.email}</p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-2xl transition-all text-sm font-bold group">
                      <UserIcon size={18} className="group-hover:text-blue-600" /> Profil Saya
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all text-sm font-bold group"
                    >
                      <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-8">
            
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
                        <span>ID: {item.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    {/* AKSI CLICK DETAILS */}
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 md:flex-none px-6 py-3 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                    >
                      Detail <ArrowUpRight size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

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

      {/* --- MODAL DETAIL COMPONENT --- */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-8 pb-4 flex justify-between items-start">
                <div className={`p-4 rounded-2xl ${
                  selectedItem.status === 'disetujui' ? 'bg-green-50' : 
                  selectedItem.status === 'menunggu' ? 'bg-orange-50' : 'bg-red-50'
                }`}>
                  {selectedItem.icon}
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-8 pb-10 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={selectedItem.status} />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{selectedItem.id}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">{selectedItem.title}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Calendar size={12} className="text-blue-500" /> Tanggal Input
                    </p>
                    <p className="text-sm font-black text-slate-700">{selectedItem.date}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Clock size={12} className="text-blue-500" /> Terakhir Update
                    </p>
                    <p className="text-sm font-black text-slate-700">{selectedItem.time}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <FileText size={12} className="text-blue-500" /> Deskripsi Pengajuan
                  </p>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-5 rounded-3xl border border-slate-100">
                    {selectedItem.fullDesc}
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95"
                  >
                    Tutup Detail
                  </button>
                </div>
              </div>

              {/* Bottom Decor */}
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
}

// Komponen NavItem
const NavItem = ({ icon, label, active = false, isOpen }: any) => (
  <div className={`
    flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative group
    ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}
  `}>
    <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</div>
    {isOpen && <span className="text-sm font-black tracking-wide leading-none">{label}</span>}
  </div>
);

// Komponen StatusBadge
function StatusBadge({ status }: { status: string }) {
  const config: any = {
    disetujui: { bg: "bg-green-500 text-white", label: "Approved" },
    menunggu: { bg: "bg-orange-500 text-white", label: "Pending" },
    ditolak: { bg: "bg-red-500 text-white", label: "Rejected" },
  };
  const style = config[status.toLowerCase()] || config.menunggu;
  return (
    <div className={`px-2.5 py-0.5 rounded-lg font-black text-[8px] uppercase tracking-tighter ${style.bg} shadow-sm inline-block`}>
      {style.label}
    </div>
  );
}