"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, MessageSquare, FileText, Clock, CheckCircle, XCircle, 
  Search, Filter, Download, LayoutDashboard, Send, History, 
  GraduationCap, X, Menu, Sparkles, ChevronRight, Zap, ShieldCheck,
  User, LogOut, ChevronDown, FileQuestion
} from "lucide-react";
import Link from "next/link";

export default function DashboardSuratPage() {
  const [user, setUser] = useState<any>(null);
  const [surat, setSurat] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // Mengambil data user
    fetch("/api/me").then((res) => res.json()).then(setUser);
    // Mengambil data surat
    fetch("/api/surat").then((res) => res.json()).then((data) => {
      setSurat(Array.isArray(data) ? data : []);
    });

    const hasSeenPromo = sessionStorage.getItem("seen-promo");
    if (!hasSeenPromo) {
      setTimeout(() => setShowPromo(true), 1500);
    }
  }, []);

  // --- LOGIKA FILTER SEARCH ---
  const filteredSurat = useMemo(() => {
    return surat.filter((s) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        s.judul?.toLowerCase().includes(searchLower) ||
        s.jenis?.toLowerCase().includes(searchLower) ||
        s.status?.toLowerCase().includes(searchLower) ||
        String(s.id).toLowerCase().includes(searchLower) ||
        s.penerima?.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, surat]);

  const closePromo = () => {
    setShowPromo(false);
    sessionStorage.setItem("seen-promo", "true");
  };

  const handleLogout = async () => {
    window.location.href = "/login";
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
      />
    </div>
  );

  const total = surat.length;
  const menunggu = surat.filter((s) => s.status === "menunggu").length;
  const disetujui = surat.filter((s) => s.status === "disetujui").length;
  const ditolak = surat.filter((s) => s.status === "ditolak").length;

  const cards = [
    { title: "Total Surat", value: total, icon: <FileText size={24} />, color: "blue" },
    { title: "Menunggu", value: menunggu, icon: <Clock size={24} />, color: "orange" },
    { title: "Disetujui", value: disetujui, icon: <CheckCircle size={24} />, color: "green" },
    { title: "Ditolak", value: ditolak, icon: <XCircle size={24} />, color: "red" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] text-slate-800 font-sans overflow-hidden">
      
      {/* MODAL PROMO AI PRO */}
      <AnimatePresence>
        {showPromo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] overflow-hidden shadow-2xl max-w-md w-full relative"
            >
              <button onClick={closePromo} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full z-10">
                <X size={20} className="text-slate-400" />
              </button>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
                <Sparkles className="absolute top-4 left-4 opacity-20 w-12 h-12" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/30">
                    <Zap className="fill-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">Upgrade ke AI Pro</h3>
                  <p className="text-blue-100 text-sm">Buat surat dinas otomatis dalam 5 detik dengan teknologi GPT-4.</p>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-600">Template surat otomatis tanpa batas.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-600">Koreksi tata bahasa otomatis (PUEBI).</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-600">Prioritas persetujuan dari Admin.</p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all mt-4 flex items-center justify-center gap-2 group">
                  Beli AI Pro Sekarang <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-widest">Hanya Rp 49.000 / Bulan</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} transition-all duration-500 bg-white border-r border-slate-100 flex flex-col z-50`}>
        <div className="p-8 flex items-center gap-4 overflow-hidden whitespace-nowrap">
          <div className="bg-blue-600 w-10 h-10 min-w-[40px] rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="font-black text-xl tracking-tight text-slate-800">Administrasi<span className="text-blue-600">AI</span></h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">User Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          <NavItem icon={<LayoutDashboard size={22} />} label="Dashboard" active isOpen={isSidebarOpen} />
          <Link href="/ajukan">
            <NavItem icon={<Send size={22} />} label="Ajukan Surat" isOpen={isSidebarOpen} />
          </Link>
          <Link href="/riwayat">
            <NavItem icon={<History size={22} />} label="Riwayat Surat" isOpen={isSidebarOpen} />
          </Link>
        </nav>

        {isSidebarOpen && (
          <div className="m-6 p-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl text-white relative overflow-hidden group">
            <Sparkles className="absolute -right-2 -top-2 opacity-20 group-hover:rotate-12 transition-transform" size={60} />
            <p className="text-xs font-bold opacity-80 mb-1 tracking-wider uppercase">Pro Account</p>
            <p className="text-sm font-black mb-4 leading-tight text-orange-50">Coba Fitur AI Premium Sekarang!</p>
            <button onClick={() => setShowPromo(true)} className="bg-white text-orange-600 text-[10px] font-black py-2 px-4 rounded-xl uppercase tracking-widest hover:bg-orange-50 transition-colors">
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
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 border border-transparent hover:border-slate-100 transition-all">
              <Menu size={20} />
            </button>
            <div className="hidden lg:flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-full w-80 border border-slate-100 focus-within:border-blue-300 focus-within:bg-white transition-all">
              <Search size={18} className={`${searchQuery ? 'text-blue-500' : 'text-slate-300'}`} />
              <input 
                type="text" 
                placeholder="Cari Judul, Kategori, atau ID..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <X size={14} className="text-slate-400 cursor-pointer hover:text-red-500" onClick={() => setSearchQuery("")} />
              )}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden sm:flex gap-4">
              <div className="relative cursor-pointer text-slate-400 hover:text-blue-600 transition-colors p-1">
                <MessageSquare size={22} />
                <span className="absolute top-1 right-1 bg-orange-500 w-2 h-2 rounded-full border-2 border-white animate-pulse"></span>
              </div>
              <div className="relative cursor-pointer text-slate-400 hover:text-blue-600 transition-colors p-1">
                <Bell size={22} />
                <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white animate-bounce"></span>
              </div>
            </div>

            {/* PROFILE SECTION WITH DROPDOWN */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-4 pl-8 border-l border-slate-100 cursor-pointer group"
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-black text-slate-800 leading-none mb-1 group-hover:text-blue-600 transition-colors">{user.name}</p>
                  <div className="flex items-center justify-end gap-1">
                    <ShieldCheck size={10} className="text-blue-500" />
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">
                      {user.role_name || "User"}
                    </p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center text-white font-black text-xl border-2 border-white ring-1 ring-slate-100 transform group-hover:rotate-3 transition-transform relative">
                  {user.name.charAt(0)}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full shadow-sm border border-slate-100 p-0.5">
                    <ChevronDown size={10} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-xs font-black text-slate-800 truncate">{user.email || user.name}</p>
                      </div>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all text-sm font-bold">
                        <User size={18} className="text-slate-400" /> Edit Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-all text-sm font-bold border-t border-slate-50"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#F4F7FE]">
          <div className="max-w-7xl mx-auto space-y-10">
            
            {/* WELCOME SECTION */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-1">Dashboard Overview</h2>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Selamat Datang, <span className="text-blue-600">{user.name.split(' ')[0]}!</span></h1>
            </motion.div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {cards.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex flex-col gap-6 relative overflow-hidden group"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full bg-${item.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-14 h-14 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center shadow-inner`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                    <p className="text-4xl font-black text-slate-800 leading-none tracking-tight">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* TABLE SECTION */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden mb-10"
            >
              <div className="p-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800">Riwayat Pengajuan Surat</h2>
                    <p className="text-sm text-slate-400 mt-1 font-medium">
                      {searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : "Daftar surat yang baru-baru ini Anda ajukan ke sistem."}
                    </p>
                  </div>
                  <div className="flex gap-4">
                     <button className="flex items-center gap-2 px-5 py-3 border border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
                      <Filter size={16} /> Filter
                    </button>
                    <Link href="/ajukan">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.1em] flex items-center gap-3 shadow-xl shadow-blue-100 transition-all active:scale-95">
                        <Zap size={16} className="fill-white" /> Buat Surat Baru
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                        <th className="pb-6 px-4">Tracking ID</th>
                        <th className="pb-6 px-4">Detail Surat</th>
                        <th className="pb-6 px-4">Kategori</th>
                        <th className="pb-6 px-4 text-center">Status</th>
                        <th className="pb-6 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <AnimatePresence mode="popLayout">
                        {filteredSurat.length > 0 ? (
                          filteredSurat.map((s, idx) => (
                            <motion.tr 
                              key={s.id || idx}
                              layout
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="group hover:bg-blue-50/40 transition-colors"
                            >
                              <td className="py-7 px-4">
                                <span className="bg-slate-100 text-slate-500 py-1.5 px-3 rounded-lg text-xs font-black">#{s.id || `SAS-${idx + 101}`}</span>
                              </td>
                              <td className="py-7 px-4">
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-800 mb-0.5 group-hover:text-blue-600 transition-colors">{s.judul}</span>
                                  <span className="text-[11px] text-slate-400 font-medium italic">Penerima: {s.penerima || "Sistem Administrasi"}</span>
                                </div>
                              </td>
                              <td className="py-7 px-4">
                                <span className="text-xs font-bold text-slate-600 bg-slate-50 py-1.5 px-4 rounded-full border border-slate-100">{s.jenis || "Administrasi"}</span>
                              </td>
                              <td className="py-7 px-4 text-center">
                                <StatusBadge status={s.status} />
                              </td>
                              <td className="py-7 px-4 text-right">
                                <button className="w-10 h-10 inline-flex items-center justify-center text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100">
                                  <Download size={20} />
                                </button>
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          /* EMPTY STATE - ANIMASI JIKA TIDAK KETEMU */
                          <motion.tr 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                          >
                            <td colSpan={5} className="py-24">
                              <div className="flex flex-col items-center justify-center text-center">
                                <motion.div 
                                  initial={{ scale: 0 }} 
                                  animate={{ scale: 1 }} 
                                  transition={{ type: "spring", bounce: 0.5 }}
                                  className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100"
                                >
                                  <FileQuestion size={40} className="text-slate-300" />
                                </motion.div>
                                <h3 className="text-lg font-black text-slate-800 mb-1">Surat Tidak Ditemukan</h3>
                                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                                  Kami tidak menemukan data untuk kata kunci <span className="text-blue-600 font-bold">"{searchQuery}"</span>.
                                </p>
                                <button 
                                  onClick={() => setSearchQuery("")}
                                  className="mt-6 text-xs font-black uppercase text-blue-600 tracking-widest hover:underline"
                                >
                                  Tampilkan Semua Surat
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>
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

function StatusBadge({ status }: { status: string }) {
  const config: any = {
    disetujui: { bg: "bg-green-50 text-green-600 border-green-100", icon: <CheckCircle size={12} />, label: "Disetujui" },
    menunggu: { bg: "bg-orange-50 text-orange-600 border-orange-100", icon: <Clock size={12} />, label: "Pending" },
    ditolak: { bg: "bg-red-50 text-red-600 border-red-100", icon: <XCircle size={12} />, label: "Ditolak" },
  };

  const style = config[status.toLowerCase()] || config.menunggu;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest border ${style.bg} shadow-sm`}>
      {style.icon} {style.label}
    </div>
  );
}

function NavItem({ icon, label, active = false, isOpen = true }: any) {
  return (
    <div className={`
      flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative group
      ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}
    `}>
      {active && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-white rounded-full mx-1" />}
      <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</div>
      {isOpen && <span className="text-sm font-black tracking-wide leading-none">{label}</span>}
    </div>
  );
}