import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center 
      bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6">

      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 text-center">
        Aplikasi Administrasi Sekolah
      </h1>

      <p className="mt-4 text-center text-gray-700 max-w-xl">
        Sistem persuratan digital dan asisten virtual berbasis AI
        untuk membantu proses administrasi sekolah secara
        <span className="font-semibold text-blue-700"> efisien dan modern</span>.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/login"
          className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-md
          hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-center"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl
          hover:bg-blue-50 hover:scale-105 transition-all duration-300 text-center"
        >
          Register
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-500">
        © 2026 Sistem Administrasi Sekolah Berbasis AI
      </p>
    </main>
  );
}
