"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, MessageSquare, FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default function DashboardSuratPage() {
  const [user, setUser] = useState<any>(null);
  const [surat, setSurat] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/me").then((res) => res.json()).then(setUser);
    fetch("/api/surat").then((res) => res.json()).then(setSurat);
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  const total = surat.length;
  const menunggu = surat.filter((s) => s.status === "menunggu").length;
  const disetujui = surat.filter((s) => s.status === "disetujui").length;
  const ditolak = surat.filter((s) => s.status === "ditolak").length;

  const cards = [
    { title: "Total Surat", value: total, icon: <FileText /> },
    { title: "Menunggu", value: menunggu, icon: <Clock /> },
    { title: "Disetujui", value: disetujui, icon: <CheckCircle /> },
    { title: "Ditolak", value: ditolak, icon: <XCircle /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="p-6 font-bold text-xl border-b">🎓 SAS Digital</div>

        <nav className="p-4 space-y-2">
          <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl cursor-pointer">
            Dashboard
          </div>
          <div className="hover:bg-gray-100 px-4 py-2 rounded-xl cursor-pointer">
            Ajukan Surat
          </div>
          <div className="hover:bg-gray-100 px-4 py-2 rounded-xl cursor-pointer">
            Riwayat
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1">
        {/* HEADER */}
        <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-xl font-semibold">Dashboard Surat</h1>
            <p className="text-sm text-gray-500">Selamat datang kembali, {user.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <MessageSquare className="cursor-pointer" />
            <Bell className="cursor-pointer" />

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">Role ID: {user.role_id}</p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="p-6 space-y-6">
          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-xl">{item.icon}</div>
              </motion.div>
            ))}
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Surat Terbaru</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">+ Buat Surat</button>
            </div>

            <table className="w-full text-sm">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="text-left py-2">Judul</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {surat.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{s.judul}</td>
                    <td className="text-center">{s.status}</td>
                    <td className="text-center">{s.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
