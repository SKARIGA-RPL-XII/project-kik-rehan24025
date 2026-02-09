"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search } from "lucide-react";

export default function ArsipSuratPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Arsip Surat</h1>
        <p className="text-slate-500">Kelola dan pantau hasil generate surat AI.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-white flex flex-row items-center justify-between">
          <CardTitle className="text-blue-600">Daftar Surat</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cari surat..." />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-blue-50 text-blue-700 text-xs uppercase">
              <tr>
                <th className="p-4">Judul Surat</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tanggal Dibuat</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {/* Contoh Data */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-medium">Surat Undangan Rapat Orang Tua</td>
                <td className="p-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded">Selesai</span></td>
                <td className="p-4 text-slate-500">2026-02-09</td>
                <td className="p-4"><button className="text-blue-600 font-bold">Lihat Detail</button></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}