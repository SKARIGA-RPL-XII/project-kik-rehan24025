"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MessageSquare 
} from "lucide-react";

// Komponen NavItem supaya kode lebih bersih
const NavItem = ({ icon, label, active = false, isOpen }: any) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:bg-gray-50'
  }`}>
    {icon}
    {isOpen && <span className="font-medium">{label}</span>}
  </div>
);

export default function RiwayatPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock data User
  const user = { name: "Budi Santoso", role: "Guru" };

  const data = [
    {
      title: "Surat disetujui",
      desc: "Surat Izin Kegiatan Ekstrakurikuler",
      time: "2 jam yang lalu",
      icon: <CheckCircle className="text-green-500" />,
      status: "Approved"
    },
    {
      title: "Surat dikirim",
      desc: "Permohonan Cuti Sakit",
      time: "1 hari yang lalu",
      icon: <Send className="text-blue-500" />,
      status: "Pending"
    },
    {
      title: "Surat ditolak",
      desc: "Pengajuan Dana Kegiatan",
      time: "5 hari yang lalu",
      icon: <XCircle className="text-red-500" />,
      status: "Rejected"
    },
  ];

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
            <NavItem icon={<Send size={20} />} label="Ajukan Surat" isOpen={isSidebarOpen} />
          </Link>
          <Link href="/riwayat">
            <NavItem icon={<History size={20} />} label="Riwayat" active isOpen={isSidebarOpen} />
          </Link>
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
              <h1 className="text-xl font-bold text-slate-800">Riwayat Aktivitas</h1>
              <p className="text-sm text-gray-400">Pantau status pengajuan surat Anda</p>
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

        {/* CONTENT */}
        <main className="p-8">
          <Card className="max-w-4xl mx-auto rounded-2xl shadow-sm border-gray-100">
            <CardHeader className="border-b border-gray-50 bg-gray-50/50 rounded-t-2xl">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" />
                Log Pengajuan Terbaru
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {data.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        {item.icon}
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">{item.title}</p>
                        <p className="text-sm text-slate-500 mb-1">{item.desc}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-xs font-semibold text-blue-600 hover:underline px-4 py-2 bg-blue-50 rounded-lg">
                      Lihat Detail
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}