"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Send, 
  History, 
  Menu, 
  X, 
  GraduationCap, 
  Bell, 
  MessageSquare 
} from "lucide-react";

// Komponen NavItem untuk Sidebar
const NavItem = ({ icon, label, active = false, isOpen }: any) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'
  }`}>
    {icon}
    {isOpen && <span className="font-medium">{label}</span>}
  </div>
);

export default function AjukanSuratPage() {
  const router = useRouter();
  
  // State untuk Layout
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock data User (Sesuaikan dengan auth kamu nantinya)
  const user = { name: "Budi Santoso", role: "Guru" };

  // State untuk Form
  const [form, setForm] = useState({
    judul: "",
    jenis: "",
    penerima: "",
    isi: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.judul || !form.jenis) return alert("Mohon isi semua field");

    const res = await fetch("/api/surat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Surat berhasil dikirim");
      router.push("/dashboard");
    } else {
      alert("Gagal mengirim surat");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col z-50 fixed h-full`}>
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
          <Link href="/dashboard">
            <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
          </Link>
          <Link href="/ajukan">
            <NavItem icon={<Send size={20} />} label="Ajukan Surat" active isOpen={isSidebarOpen} />
          </Link>
          <NavItem icon={<History size={20} />} label="Riwayat" isOpen={isSidebarOpen} />
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* HEADER */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Pengajuan Surat</h1>
              <p className="text-sm text-gray-400">Silahkan isi formulir di bawah ini</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 border-r pr-6">
              <div className="relative cursor-pointer hover:scale-110 transition-transform text-slate-400">
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-orange-500 w-2 h-2 rounded-full border-2 border-white"></span>
              </div>
              <div className="relative cursor-pointer hover:scale-110 transition-transform text-slate-400">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                <p className="text-[11px] text-gray-400 font-medium">{user.role}</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full ring-4 ring-blue-50 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* FORM CONTENT */}
        <main className="p-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              Detail Surat
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Surat</label>
                <select
                  name="jenis"
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Pilih jenis surat</option>
                  <option value="izin">Izin</option>
                  <option value="cuti">Cuti</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Surat</label>
                <input
                  name="judul"
                  placeholder="Contoh: Permohonan Izin Sakit"
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ditujukan Kepada</label>
                <input
                  name="penerima"
                  placeholder="Nama Kepala Sekolah / HRD"
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Isi Surat</label>
                <textarea
                  name="isi"
                  placeholder="Tuliskan alasan atau detail pengajuan Anda..."
                  className="w-full border border-gray-200 rounded-xl p-3 h-40 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={submit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-xl w-full shadow-lg shadow-blue-100 transition-all flex justify-center items-center gap-2 mt-4"
              >
                <Send size={18} />
                Kirim Pengajuan
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}