"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Camera, Save, ArrowLeft, 
  CheckCircle, Smartphone
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            id: data.id || "",
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            avatar: data.avatar || ""
          });
        }
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if(res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Gagal update profil:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 overflow-y-auto">
      {/* Dekorasi Background Atas */}
      <div className="h-48 bg-blue-600 w-full absolute top-0 left-0 z-0"></div>

      <div className="relative z-10 max-w-2xl mx-auto pt-10 px-4">
        {/* Tombol Kembali */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-6 font-bold transition-all"
        >
          <ArrowLeft size={20} /> Kembali ke Beranda
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] shadow-2xl shadow-blue-900/10 overflow-hidden"
        >
          {/* Header Profil & Foto */}
          <div className="p-8 text-center border-b border-slate-50">
            <div className="relative inline-block mb-4">
              <div className="w-28 h-28 rounded-3xl bg-blue-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <User size={48} className="text-blue-500" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <Camera size={16} />
                <input type="file" className="hidden" />
              </label>
            </div>
            <h2 className="text-2xl font-black text-slate-800">{formData.name || "Nama Pengguna"}</h2>
            <p className="text-slate-400 font-medium">{formData.email}</p>
          </div>

          {/* Form Input Data */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            
            {/* Input Nama */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nama Kamu</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                  placeholder="Nama lengkap kamu"
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Aktif</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Input Nomor HP */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                  placeholder="0812xxxx"
                />
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-sm tracking-[2px] shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <><Save size={18} /> Simpan Perubahan</>
                )}
              </button>
            </div>

            {/* Notifikasi Sukses */}
            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm bg-green-50 py-3 rounded-xl border border-green-100"
              >
                <CheckCircle size={18} /> Profil berhasil diperbarui!
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}