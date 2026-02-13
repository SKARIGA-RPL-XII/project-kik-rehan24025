"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Send, 
  History, 
  Menu, 
  X, 
  GraduationCap, 
  Bell, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Info,
  ArrowLeft,
  PenLine,
  LogOut,
  User as UserIcon
} from "lucide-react";
import Swal from "sweetalert2";

export default function AjukanSuratPage() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // State untuk Data User
  const [user, setUser] = useState({ name: "Loading...", role_name: "User", email: "" });

  // State untuk Form
  const [form, setForm] = useState({
    judul: "",
    jenis: "",
    penerima: "",
    isi: "",
  });

  // Ambil data user
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.name) setUser(data);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  // Handle Klik di luar Dropdown Profile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    router.push("/login");
  };

  // Fitur AI Writing
  const handleAiWrite = () => {
    if (!form.jenis || !form.judul) {
      Swal.fire({
        icon: 'info',
        title: 'Data Kurang Lengkap',
        text: 'Pilih jenis dan judul surat terlebih dahulu agar AI bisa bekerja.',
        confirmButtonColor: '#2563eb'
      });
      return;
    }
    setIsAiLoading(true);
    setTimeout(() => {
      setForm({
        ...form,
        isi: `Yth. ${form.penerima || "[Nama Penerima]"},\n\nMelalui surat ini, saya yang bertanda tangan di bawah ini mengajukan ${form.jenis} terkait ${form.judul}. Adapun alasan pengajuan ini adalah untuk keperluan kedinasan/pribadi yang tidak dapat ditinggalkan.\n\nDemikian surat ini saya sampaikan, atas perhatian dan izin yang diberikan saya ucapkan terima kasih.`
      });
      setIsAiLoading(false);
    }, 1500);
  };

  // Fungsi Kirim ke Database - DIPERBARUI AGAR SINKRON DENGAN API
  const submit = async () => {
    // Validasi field wajib
    if (!form.judul || !form.jenis || !form.isi) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Mohon isi semua field wajib!' });
      return;
    }

    try {
      const res = await fetch("/api/surat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mengirim seluruh object form (termasuk penerima)
        body: JSON.stringify({
          judul: form.judul,
          jenis: form.jenis,
          isi: form.isi,
          penerima: form.penerima // Memastikan data penerima ikut terkirim
        }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Terkirim',
          text: result.message,
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => router.push("/dashboard"), 1600);
      } else {
        // Jika error 400 dari API (Kategori tidak ditemukan), pesan ini akan muncul
        Swal.fire({ icon: 'error', title: 'Gagal', text: result.message });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Terjadi kesalahan koneksi.' });
    }
  };

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
          <NavItem icon={<Send size={22} />} label="Ajukan Surat" active isOpen={isSidebarOpen} />
          <Link href="/riwayat">
            <NavItem icon={<History size={22} />} label="Riwayat Surat" isOpen={isSidebarOpen} />
          </Link>
        </nav>

        {isSidebarOpen && (
          <div className="m-6 p-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl text-white relative overflow-hidden group shadow-lg shadow-orange-100">
            <Sparkles className="absolute -right-2 -top-2 opacity-20 group-hover:rotate-12 transition-transform" size={60} />
            <p className="text-xs font-bold opacity-80 mb-1 tracking-wider uppercase">Pro Account</p>
            <p className="text-sm font-black mb-4 leading-tight">Gunakan AI untuk menulis surat otomatis!</p>
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
              <h1 className="text-xl font-black text-slate-800">Formulir Pengajuan</h1>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <PenLine size={12} className="text-blue-500" /> Surat Kedinasan Digital
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 pl-8 border-l border-slate-100 relative" ref={dropdownRef}>
              <div className="text-right hidden md:block">
                <p className="text-sm font-black text-slate-800 leading-none mb-1">{user.name}</p>
                <div className="flex items-center justify-end gap-1">
                  <ShieldCheck size={10} className="text-blue-500" />
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{user.role_name}</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-12 h-12 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center text-white font-black text-xl border-2 border-white ring-1 ring-slate-100 hover:scale-105 transition-all"
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
                      <p className="text-xs font-black text-slate-800 truncate">{user.email || "user@example.com"}</p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-2xl transition-all text-sm font-bold group text-left">
                      <UserIcon size={18} className="group-hover:text-blue-600" /> Profil Saya
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all text-sm font-bold group text-left"
                    >
                      <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* SCROLLABLE FORM AREA */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#F4F7FE]">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Dashboard
            </Link>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] shadow-sm border border-slate-50 overflow-hidden"
            >
              <div className="grid md:grid-cols-3">
                {/* Information Side */}
                <div className="bg-slate-900 p-10 text-white">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                    <Info size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-4 leading-tight">Panduan Pengajuan</h3>
                  <ul className="space-y-4 text-slate-400 text-sm font-medium">
                    <li className="flex gap-3"><span className="text-blue-500 font-black">01</span> Pilih kategori surat yang sesuai dengan database.</li>
                    <li className="flex gap-3"><span className="text-blue-500 font-black">02</span> Gunakan fitur AI untuk mempercepat penulisan draf.</li>
                    <li className="flex gap-3"><span className="text-blue-500 font-black">03</span> Status 'menunggu' berarti surat sedang diverifikasi Admin.</li>
                  </ul>

                  <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Butuh Bantuan?</p>
                    <p className="text-xs text-slate-400">Hubungi tim IT jika kategori surat yang Anda cari tidak tersedia.</p>
                  </div>
                </div>

                {/* Form Side */}
                <div className="md:col-span-2 p-10">
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Surat</label>
                        <select
                          name="jenis"
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Pilih Kategori</option>
                          <option value="Izin Meninggalkan Tugas">Izin Meninggalkan Tugas</option>
                          <option value="Permohonan Cuti">Permohonan Cuti</option>
                          <option value="Surat Tugas">Surat Tugas</option>
                          <option value="Undangan Rapat">Undangan Rapat</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul / Perihal</label>
                        <input
                          name="judul"
                          placeholder="Contoh: Permohonan Izin Sakit"
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Penerima (Yth.)</label>
                      <input
                        name="penerima"
                        placeholder="Nama Kepala Sekolah atau Jabatan"
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2 relative">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Isi Surat Lengkap</label>
                        <button 
                          type="button"
                          onClick={handleAiWrite}
                          disabled={isAiLoading}
                          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-all"
                        >
                          <Sparkles size={12} className={isAiLoading ? 'animate-spin' : ''} /> {isAiLoading ? 'Menulis...' : 'Bantu Tulis (AI)'}
                        </button>
                      </div>
                      <textarea
                        name="isi"
                        value={form.isi}
                        onChange={handleChange}
                        placeholder="Tuliskan isi surat secara mendetail..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-[24px] p-6 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition-all h-56 resize-none leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={submit}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[24px] shadow-xl shadow-blue-100 flex justify-center items-center gap-3 transition-all active:scale-[0.98] mt-4"
                    >
                      Kirim Pengajuan Sekarang <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <footer className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] py-10">
              © 2026 SAS Digital System • Integrated Admin Portal
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

// NavItem Component
const NavItem = ({ icon, label, active = false, isOpen }: any) => (
  <div className={`
    flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative group
    ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}
  `}>
    <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</div>
    {isOpen && <span className="text-sm font-black tracking-wide leading-none">{label}</span>}
  </div>
);