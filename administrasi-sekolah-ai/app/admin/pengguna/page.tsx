"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, Plus, LayoutDashboard, History, Menu, 
  ShieldCheck, LogOut, Search, Filter, Edit3, 
  Trash2, FileText, Activity, Bell
} from "lucide-react";

export default function DataPenggunaPage() {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  
  // Data user admin untuk Navbar
  const adminInfo = {
    name: "Admin SASPRO",
    role_name: "Administrator",
    email: "admin@saspro.id"
  };

  // ================= 1. FETCH DATA =================
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= 2. DELETE USER =================
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchUsers();
      else alert("Gagal menghapus user");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= 3. EDIT USER =================
  const handleEdit = async (user: any) => {
    const newName = prompt("Ubah Nama Pengguna:", user.name);
    if (!newName || newName === user.name) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, name: newName }),
      });
      if (res.ok) fetchUsers();
      else alert("Gagal memperbarui nama");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= 4. LOGOUT FUNCTION =================
  const handleLogout = () => {
    if (confirm("Apakah Anda ingin keluar?")) {
      router.push("/login"); 
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] text-slate-800 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -250 }} 
            animate={{ x: 0 }} 
            exit={{ x: -250 }}
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
              <SidebarLink href="/admin/pengguna" icon={Users} label="Data Pengguna" active />
              <SidebarLink href="/admin/arsip" icon={FileText} label="Arsip Surat" />
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

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* --- NAVBAR --- */}
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
                <p className="text-sm font-black text-slate-800 leading-none">{adminInfo.name}</p>
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{adminInfo.role_name}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center font-bold text-blue-600 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${adminInfo.name}&background=4f46e5&color=fff`} alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
              <div>
                <h1 className="text-2xl font-black text-slate-800">Database Pengguna</h1>
                <p className="text-sm text-slate-500 font-medium">Kelola hak akses dan informasi akun terdaftar.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                <Plus size={18} /> Tambah User Baru
              </button>
            </div>

            {/* TABLE CARD */}
            <Card className="border-none shadow-2xl shadow-blue-900/5 rounded-[32px] overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-slate-50">
                        <th className="p-6">Nama Pengguna</th>
                        <th className="p-6">Email</th>
                        <th className="p-6">Role</th>
                        <th className="p-6">Status</th>
                        <th className="p-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {users.length > 0 ? (
                        users.map((user: any) => (
                          <tr key={user.id} className="group hover:bg-blue-50/30 transition-all">
                            <td className="p-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-sm uppercase">
                                  {user.name.charAt(0)}
                                </div>
                                <span className="font-bold text-slate-700">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-6 text-sm text-slate-500 font-medium">{user.email}</td>
                            <td className="p-6">
                              <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                {user.role_name}
                              </span>
                            </td>
                            <td className="p-6">
                               <div className="flex items-center gap-1.5 text-green-500 font-bold text-xs">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                  Aktif
                               </div>
                            </td>
                            <td className="p-6">
                              <div className="flex justify-center gap-2">
                                <button onClick={() => handleEdit(user)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                  <Edit3 size={18} />
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-10 text-center text-slate-400 font-bold italic">Memuat data pengguna...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <footer className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] py-10">
              © 2026 CONTROL ADMIN PANEL • SASPRO SYSTEM
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

// Komponen Navigasi Sidebar
const SidebarLink = ({ href, icon: Icon, label, active = false }: any) => (
  <Link href={href} className="block">
    <div className={`
      flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm
      ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:bg-slate-50 hover:text-blue-600"}
    `}>
      <Icon size={20} />
      <span>{label}</span>
    </div>
  </Link>
);