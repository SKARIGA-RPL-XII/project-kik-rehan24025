"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login berhasil");

        console.log("ROLE:", data.role);

        if (data.role?.toLowerCase() === "admin") {
          router.push("/admin"); // SESUAIKAN DENGAN FOLDER
        } else {
          router.push("/dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
      {/* BAGIAN KIRI - WELCOME SECTION */}
      <div className="hidden lg:flex flex-col justify-center items-start w-2/5 bg-white p-20 relative animate-fadeInLeft">
        <div className="absolute top-12 left-12 flex items-center space-x-2">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <div className="text-xs font-bold leading-tight">
            <span className="text-blue-600">adminitrasi sekolah </span><br />
            <span className="text-blue-400 text-[10px]">(a)</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-blue-500 mb-2">WELCOME BACK !</h1>
        <p className="text-blue-400 text-lg max-w-xs">
          Enter your ID and Password to continue
        </p>
      </div>

      {/* BAGIAN KANAN - FORM SECTION */}
      <div className="relative flex-1 bg-gradient-to-b from-blue-700 to-blue-400 flex flex-col justify-center items-center p-8 overflow-hidden">
        
        <div className="absolute left-0 h-[120%] w-32 bg-white -translate-x-1/2 rounded-[100%] hidden lg:block"></div>

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 text-white text-4xl italic">🗝️</div>
          <div className="absolute bottom-20 right-20 text-white text-4xl italic">✉️</div>
          <div className="absolute middle right-1/3 text-white text-4xl italic">🔒</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-sm animate-fadeInUp"
        >
          <div className="text-center mb-10">
            <h2 className="text-white text-3xl font-semibold tracking-wide">SIGN IN</h2>
            <p className="text-blue-100 text-sm tracking-widest mt-1">TO ACCESS THE PORTAL</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-blue-500">
                👤
              </span>
              <input
                placeholder="Enter User Name Here"
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 rounded-full border-none outline-none text-gray-700 bg-white shadow-inner focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-blue-500">
                🔑
              </span>
              <input
                placeholder="Enter Password"
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 rounded-full border-none outline-none text-gray-700 bg-white shadow-inner focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-[#00d27a] hover:bg-[#00bc6d] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            Login
          </button>

          <div className="text-center mt-6">
            <button type="button" className="text-blue-100 hover:text-white text-sm underline transition-colors">
              Forgot Password?
            </button>
          </div>
        </form>

        <div className="absolute bottom-6 text-white text-[10px] opacity-70">
          Copyright © 2026 Commllink Info Tech Ltd. All rights reserved.
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
