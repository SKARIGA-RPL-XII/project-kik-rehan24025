"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjukanSuratPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    judul: "",
    jenis: "",
    penerima: "",
    isi: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const res = await fetch("/api/surat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Surat berhasil dikirim");
      router.push("/dashboard");
    } else {
      alert("Gagal mengirim surat");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-xl font-semibold mb-6">
          Form Pengajuan Surat
        </h1>

        <div className="space-y-4">
          <select
            name="jenis"
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          >
            <option value="">Pilih jenis surat</option>
            <option value="izin">Izin</option>
            <option value="cuti">Cuti</option>
          </select>

          <input
            name="judul"
            placeholder="Judul surat"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
          />

          <input
            name="penerima"
            placeholder="Ditujukan kepada"
            className="border rounded-lg p-3 w-full"
            onChange={handleChange}
          />

          <textarea
            name="isi"
            placeholder="Isi surat"
            className="border rounded-lg p-3 w-full h-40"
            onChange={handleChange}
          />

          <button
            onClick={submit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
          >
            Kirim Surat
          </button>
        </div>
      </div>
    </div>
  );
}
