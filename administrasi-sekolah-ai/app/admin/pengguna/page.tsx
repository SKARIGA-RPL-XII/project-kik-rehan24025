"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus } from "lucide-react";

export default function DataPenggunaPage() {
  const [users, setUsers] = useState([]);

  // Simulasi fetch data dari API Route (mengacu ke tabel 'users' & 'roles')
  useEffect(() => {
    const fetchData = async () => {
      // Ganti dengan endpoint API real anda: /api/users
      const res = [
        { id: 1, name: "Budi Santoso", email: "budi@mail.com", role_name: "Guru" },
        { id: 2, name: "Admin Utama", email: "admin@mail.com", role_name: "Admin" },
      ];
      setUsers(res);
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Pengguna</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
          <Plus size={18} /> Tambah User
        </button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-slate-100">
          <CardTitle className="text-blue-600 flex items-center gap-2">
            <Users size={20} /> Daftar Akun Terdaftar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50 text-blue-700 uppercase text-[12px] tracking-wider">
                <th className="p-4 font-bold">Nama Lengkap</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-medium text-slate-700">{user.name}</td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                      {user.role_name}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-blue-600 font-semibold hover:underline mr-3">Edit</button>
                    <button className="text-red-500 font-semibold hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}