"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function LogAktivitasPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Monitoring Sistem</h1>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-blue-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-2"><Activity size={20}/> Log Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {/* Map Log Data from DB */}
            <div className="p-4 flex items-center justify-between hover:bg-blue-50/50">
              <div>
                <p className="font-bold text-slate-700">Admin Utama</p>
                <p className="text-sm text-slate-500">Mengedit data pengguna: Budi Santoso</p>
              </div>
              <p className="text-xs text-slate-400 italic">2 menit yang lalu</p>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-blue-50/50">
              <div>
                <p className="font-bold text-slate-700">Guru - Budi</p>
                <p className="text-sm text-slate-500">Membuat surat baru via AI</p>
              </div>
              <p className="text-xs text-slate-400 italic">15 menit yang lalu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}