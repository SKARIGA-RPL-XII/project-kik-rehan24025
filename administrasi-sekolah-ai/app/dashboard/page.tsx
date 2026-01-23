export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard Administrasi Sekolah
      </h1>

      <p className="mb-6 text-gray-700">
        Selamat datang di sistem administrasi sekolah berbasis AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">📄 Persuratan Digital</h2>
          <p className="text-sm text-gray-600">
            Buat dan kelola surat dengan bantuan AI
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">🤖 Asisten AI</h2>
          <p className="text-sm text-gray-600">
            Ringkas teks & buat surat otomatis
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">📊 Riwayat Aktivitas</h2>
          <p className="text-sm text-gray-600">
            Pantau penggunaan sistem
          </p>
        </div>
      </div>
    </div>
  );
}
