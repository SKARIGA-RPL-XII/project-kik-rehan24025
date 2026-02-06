"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Download,
  LayoutDashboard,
  Send,
  History,
  GraduationCap,
  X,
  Menu
} from "lucide-react";
import Link from "next/link";

export default function DashboardSuratPage() {
  const [user, setUser] = useState<any>(null);
  const [surat, setSurat] = useState<any[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Logika backend tidak dirubah
    fetch("/api/me").then((res) => res.json()).then(setUser);
    fetch("/api/surat").then((res) => res.json()).then(setSurat);
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  const total = surat.length;
  const menunggu = surat.filter((s) => s.status === "menunggu").length;
  const disetujui = surat.filter((s) => s.status === "disetujui").length;
  const ditolak = surat.filter((s) => s.status === "ditolak").length;

  const cards = [
    { title: "Total Surat", value: total, icon: <FileText className="text-blue-600" />, bg: "bg-blue-100", textColor: "text-black" },
    { title: "Menunggu", value: menunggu, icon: <Clock className="text-orange-500" />, bg: "bg-orange-100", textColor: "text-orange-600" },
    { title: "Disetujui", value: disetujui, icon: <CheckCircle className="text-green-500" />, bg: "bg-green-100", textColor: "text-green-600" },
    { title: "Ditolak", value: ditolak, icon: <XCircle className="text-red-500" />, bg: "bg-red-100", textColor: "text-red-600" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] text-slate-800 font-sans">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-800">SAS Digital</h1>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">User Portal</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active isOpen={isSidebarOpen} />
          <Link href="/ajukan">
            <NavItem icon={<Send size={20} />} label="Ajukan Surat" isOpen={isSidebarOpen} />
          </Link>
          <NavItem icon={<History size={20} />} label="Riwayat" isOpen={isSidebarOpen} />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Dashboard Surat</h1>
              <p className="text-sm text-gray-400">Selamat datang kembali, <span className="font-medium text-slate-600">{user.name}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 border-r pr-6">
              <div className="relative cursor-pointer hover:scale-110 transition-transform">
                <MessageSquare className="text-slate-400 w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-orange-500 w-2 h-2 rounded-full border-2 border-white"></span>
              </div>
              <div className="relative cursor-pointer hover:scale-110 transition-transform">
                <Bell className="text-slate-400 w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                <p className="text-[11px] text-gray-400 font-medium">Guru</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full ring-4 ring-blue-50 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex justify-between items-center"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.title}</p>
                  <p className={`text-3xl font-bold ${item.textColor}`}>{item.value}</p>
                </div>
                <div className={`${item.bg} p-4 rounded-[18px]`}>
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* TABLE SECTION */}
          <section className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-xl font-bold text-slate-800">Surat Terbaru</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
                  <span className="text-xl">+</span> Buat Surat
                </button>
              </div>

              {/* SEARCH & FILTER */}
              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Cari surat..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                  />
                </div>
                <button className="flex items-center gap-2 px-5 py-3 border border-gray-100 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
                  <Filter size={18} /> Filter
                </button>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] border-b border-gray-50">
                      <th className="pb-4 px-4">ID</th>
                      <th className="pb-4 px-4">Judul Surat</th>
                      <th className="pb-4 px-4">Jenis</th>
                      <th className="pb-4 px-4">Penerima</th>
                      <th className="pb-4 px-4 text-center">Tanggal</th>
                      <th className="pb-4 px-4 text-center">Status</th>
                      <th className="pb-4 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {surat.map((s, idx) => (
                      <motion.tr 
                        key={s.id || idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="py-5 px-4 font-bold text-sm text-slate-800">{s.id || `L00${idx + 1}`}</td>
                        <td className="py-5 px-4 text-sm font-medium text-slate-600 max-w-[200px] truncate">{s.judul}</td>
                        <td className="py-5 px-4 text-sm text-slate-500">{s.jenis || "Kegiatan"}</td>
                        <td className="py-5 px-4 text-sm text-slate-500">{s.penerima || "Kepala Sekolah"}</td>
                        <td className="py-5 px-4 text-sm text-slate-500 text-center">{s.created_at || "1/2/2026"}</td>
                        <td className="py-5 px-4 text-center">
                          <StatusBadge status={s.status} />
                        </td>
                        <td className="py-5 px-4 text-right">
                          <button className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors">
                            <Download size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Komponen Helper untuk Status Badge
function StatusBadge({ status }: { status: string }) {
  const config: any = {
    disetujui: { bg: "bg-green-100 text-green-600", icon: <CheckCircle size={14} />, label: "Disetujui" },
    menunggu: { bg: "bg-orange-100 text-orange-600", icon: <Clock size={14} />, label: "Menunggu" },
    ditolak: { bg: "bg-red-100 text-red-600", icon: <XCircle size={14} />, label: "Ditolak" },
  };

  const style = config[status.toLowerCase()] || config.menunggu;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[11px] ${style.bg}`}>
      {style.icon} {style.label}
    </div>
  );
}

// Komponen Helper untuk Navigasi Sidebar
function NavItem({ icon, label, active = false, isOpen = true }: any) {
  return (
    <div className={`
      flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all
      ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-50 hover:text-slate-600'}
    `}>
      {icon}
      {isOpen && <span className="text-sm font-bold tracking-wide">{label}</span>}
    </div>
  );
}