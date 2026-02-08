"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Shield, Cpu, MessageSquare } from "lucide-react";

// --- Animasi Variants ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Cpu className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-blue-900 tracking-tight">EduAdmin<span className="text-blue-500">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <a href="#fitur" className="hover:text-blue-600 transition-colors">Fitur</a>
            <a href="#tentang" className="hover:text-blue-600 transition-colors">Tentang</a>
            <a href="#kontak" className="hover:text-blue-600 transition-colors">Kontak</a>
            <Link href="/login" className="px-5 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">Login</Link>
            <Link href="/register" className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">Daftar</Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <motion.div 
          initial="initial" animate="animate" variants={staggerContainer}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.span variants={fadeInUp} className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 inline-block">
            Transformasi Digital Sekolah 4.0
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 leading-tight">
            Administrasi Sekolah <br /> <span className="text-blue-600 italic">Lebih Cerdas dengan AI</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Otomatisasi persuratan, pengarsipan digital, dan asisten virtual AI dalam satu platform terintegrasi untuk efisiensi maksimal.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:row gap-4 justify-center">
            <Link href="/register" className="px-10 py-4 bg-blue-600 text-white rounded-full text-lg font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Mulai Sekarang — Gratis
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- FITUR SECTION --- */}
      <section id="fitur" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900">Fitur Unggulan</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <MessageSquare />, title: "Asisten AI", desc: "Tanya jawab administrasi dan pembuatan draf surat otomatis." },
            { icon: <Shield />, title: "Keamanan Data", desc: "Enkripsi tingkat tinggi untuk menjaga privasi data guru dan siswa." },
            { icon: <CheckCircle />, title: "E-Arsip", desc: "Pencarian dokumen kilat tanpa perlu bongkar lemari fisik." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 bg-white border border-blue-50 rounded-2xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- KONTAK SECTION --- */}
      <section id="kontak" className="py-24 bg-blue-900 text-white px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">Butuh Bantuan?</h2>
            <p className="text-blue-200 mb-10 text-lg">Tim kami siap membantu proses migrasi administrasi sekolah Anda ke sistem digital.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center"><Mail size={20}/></div>
                <span>support@eduadmin.ai</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center"><Phone size={20}/></div>
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center"><MapPin size={20}/></div>
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <form className="space-y-4 text-gray-800">
              <div>
                <label className="text-sm font-semibold">Nama Lengkap</label>
                <input type="text" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Budi Santoso" />
              </div>
              <div>
                <label className="text-sm font-semibold">Email Sekolah</label>
                <input type="email" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin@sekolah.sch.id" />
              </div>
              <div>
                <label className="text-sm font-semibold">Pesan</label>
                <textarea rows={4} className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Apa yang bisa kami bantu?"></textarea>
              </div>
              <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Cpu className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-blue-900">EduAdminAI</span>
          </div>
          <p className="text-gray-500 text-sm italic">© 2026 Sistem Administrasi Sekolah Berbasis AI. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}