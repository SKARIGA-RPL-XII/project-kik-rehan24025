export default function DashboardSiswaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Siswa
        </h1>
        <p className="text-gray-600 mt-2">
          Selamat datang di sistem administrasi sekolah
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8 border-l-4 border-blue-600">
        <h2 className="text-xl font-semibold text-gray-800">
          👋 Halo, Siswa
        </h2>
        <p className="text-gray-600 mt-1">
          Kelola aktivitas sekolahmu dengan mudah dan cepat
        </p>
      </div>

      {/* Menu Fitur */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Surat */}
        <div className="bg-white p-6 rounded-2xl shadow
          hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            📄 Surat Masuk & Keluar
          </h3>
          <p className="text-gray-600 text-sm">
            Lihat surat resmi dari sekolah dan ajukan permohonan surat
          </p>
        </div>

        {/* AI */}
        <div className="bg-white p-6 rounded-2xl shadow
          hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🤖 Asisten AI
          </h3>
          <p className="text-gray-600 text-sm">
            Bantu membuat surat izin, permohonan, dan ringkasan otomatis
          </p>
        </div>

        {/* Profil */}
        <div className="bg-white p-6 rounded-2xl shadow
          hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            👤 Profil Siswa
          </h3>
          <p className="text-gray-600 text-sm">
            Lihat dan perbarui data diri serta informasi akademik
          </p>
        </div>

        {/* Pengumuman */}
        <div className="bg-white p-6 rounded-2xl shadow
          hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            📢 Pengumuman
          </h3>
          <p className="text-gray-600 text-sm">
            Informasi terbaru dari sekolah dan wali kelas
          </p>
        </div>

        {/* Riwayat */}
        <div className="bg-white p-6 rounded-2xl shadow
          hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🕒 Riwayat Aktivitas
          </h3>
          <p className="text-gray-600 text-sm">
            Pantau aktivitas surat dan penggunaan sistem
          </p>
        </div>

        {/* Logout */}
        <div className="bg-blue-600 p-6 rounded-2xl shadow
          hover:bg-blue-700 transition-all duration-300 text-white">
          <h3 className="text-lg font-semibold mb-2">
            🚪 Keluar
          </h3>
          <p className="text-sm opacity-90">
            Logout dari akun siswa dengan aman
          </p>
        </div>

      </div>
    </div>
  );
}
