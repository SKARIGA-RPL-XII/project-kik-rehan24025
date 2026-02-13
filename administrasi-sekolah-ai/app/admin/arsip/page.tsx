"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Users, FileText, Activity, 
  LogOut, Menu, Search, Bell, CheckCircle, XCircle, Eye, X 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Swal from "sweetalert2";

export default function ArsipSuratPage() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [suratList, setSuratList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSurat, setSelectedSurat] = useState<any>(null); // State untuk Modal
  
  // Data dummy user untuk Navbar (sesuaikan dengan state auth kamu jika ada)
  const [user] = useState({ name: "Admin SASPRO", role_name: "Administrator" });

  // 1. Ambil Data Surat (Gunakan API Admin agar data muncul semua)
  const fetchSurat = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/surat"); 
      const data = await res.json();
      setSuratList(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurat();
  }, []);

  // 2. Fungsi Update Status
  const handleUpdateStatus = async (id: number, status: string) => {
    const confirm = await Swal.fire({
      title: `Apakah anda yakin?`,
      text: `Surat ini akan ${status === 'disetujui' ? 'diterima' : 'ditolak'}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: status === 'disetujui' ? '#10b981' : '#ef4444',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/admin/surat`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status })
        });

        if (res.ok) {
          Swal.fire("Berhasil", `Surat telah ${status}`, "success");
          setSelectedSurat(null); // Tutup modal jika sedang terbuka
          fetchSurat(); 
        }
      } catch (error) {
        Swal.fire("Error", "Gagal mengubah status", "error");
      }
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col z-50 shadow-xl shadow-blue-900/5"
          >
            <div className="p-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-800">Control<span className="text-blue-600">Admin</span></span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 px-4">Navigation</p>
              <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
              <SidebarLink href="/admin/pengguna" icon={Users} label="Data Pengguna" />
              <SidebarLink href="/admin/arsip" icon={FileText} label="Arsip Surat" active />
              <SidebarLink href="/admin/logs" icon={Activity} label="Log Aktivitas" />
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

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* --- NAVBAR --- */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full w-80 shadow-inner border border-slate-200">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Cari arsip surat..." className="bg-transparent border-none outline-none text-sm w-full" />
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

        {/* --- MAIN CONTENT --- */}
        <main className="p-8 overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-800">Manajemen Arsip Surat</h1>
            <p className="text-sm text-slate-500 font-medium">Verifikasi pengajuan dari seluruh pengguna aplikasi.</p>
          </div>

          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[30px] overflow-hidden bg-white">
            <CardHeader className="bg-white border-b border-slate-50 p-6">
              <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                Daftar Seluruh Surat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                      <th className="p-6">Pengaju</th>
                      <th className="p-6">Judul Surat</th>
                      <th className="p-6">Status</th>
                      <th className="p-6">Tanggal</th>
                      <th className="p-6 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                       <tr><td colSpan={5} className="p-10 text-center text-slate-400 font-bold">Mengambil data...</td></tr>
                    ) : suratList.map((surat: any) => (
                      <tr key={surat.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="p-6">
                          <p className="font-bold text-slate-800 text-sm">{surat.nama_pengaju}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{surat.email_pengaju}</p>
                        </td>
                        <td className="p-6">
                          <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{surat.judul}</p>
                          <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">{surat.nama_surat}</span>
                        </td>
                        <td className="p-6">
                          <StatusBadge status={surat.status} />
                        </td>
                        <td className="p-6 text-sm font-medium text-slate-500">
                          {new Date(surat.created_at).toLocaleDateString('id-ID')}
                        </td>
                        <td className="p-6">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => setSelectedSurat(surat)}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                            >
                              <Eye size={14} /> Detail
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* --- MODAL DETAIL SURAT --- */}
      <AnimatePresence>
        {selectedSurat && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedSurat(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-800">{selectedSurat.judul}</h2>
                    <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">{selectedSurat.nama_surat}</p>
                  </div>
                  <button onClick={() => setSelectedSurat(null)} className="p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-3xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Nama Pengaju</p>
                    <p className="font-bold text-slate-700">{selectedSurat.nama_pengaju}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-3xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Status Saat Ini</p>
                    <StatusBadge status={selectedSurat.status} />
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">Isi Surat / Pesan</p>
                  <div className="p-6 bg-slate-50 rounded-[30px] border border-slate-100 text-slate-600 leading-relaxed text-sm h-48 overflow-y-auto">
                    {selectedSurat.isi_surat || "Tidak ada detail isi surat."}
                  </div>
                </div>

                {/* Tombol Aksi di dalam Modal */}
                {selectedSurat.status === 'menunggu' && (
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleUpdateStatus(selectedSurat.id, 'disetujui')}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-green-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-200"
                    >
                      <CheckCircle size={18} /> Setujui Surat
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedSurat.id, 'ditolak')}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-100"
                    >
                      <XCircle size={18} /> Tolak Surat
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- KOMPONEN PEMBANTU ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    menunggu: "bg-orange-50 text-orange-600 border-orange-100",
    disetujui: "bg-green-50 text-green-600 border-green-100",
    ditolak: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${styles[status]}`}>
      {status}
    </span>
  );
};

const SidebarLink = ({ href, icon: Icon, label, active = false }: any) => (
  <a 
    href={href}
    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
      active 
      ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
      : "text-slate-400 hover:bg-slate-50 hover:text-blue-600"
    }`}
  >
    <Icon size={20} />
    {label}
  </a>
);