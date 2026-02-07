"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, FileText, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      
       ><h1 className="text-3xl font-bold flex items-center gap-2">
          <LayoutDashboard /> Dashboard Admin
        </h1>
        <p className="text-slate-500">Panel pengelolaan sistem</p>
      </motion.div>

      {/* MENU GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* MONITORING */}
        <motion.div whileHover={{ scale: 1.03 }}>
          <Card className="rounded-2xl shadow-sm cursor-pointer" onClick={() => router.push("/admin/monitoring")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity /> Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              Lihat aktivitas sistem dan baca laporan monitoring.
              <div className="mt-4">
                <Button>Masuk</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* KELOLA USER */}
        <motion.div whileHover={{ scale: 1.03 }}>
          <Card className="rounded-2xl shadow-sm cursor-pointer" onClick={() => router.push("/admin/users")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users /> Kelola User
              </CardTitle>
            </CardHeader>
            <CardContent>
              Tambah, edit, dan hapus user sistem.
              <div className="mt-4">
                <Button>Kelola</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* KELOLA SURAT */}
        <motion.div whileHover={{ scale: 1.03 }}>
          <Card className="rounded-2xl shadow-sm cursor-pointer" onClick={() => router.push("/admin/surat")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText /> Kelola Surat
              </CardTitle>
            </CardHeader>
            <CardContent>
              Proses surat dari user dan manajemen dokumen.
              <div className="mt-4">
                <Button>Buka</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
