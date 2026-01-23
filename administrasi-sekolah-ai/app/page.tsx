import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-center">
        Aplikasi Administrasi Sekolah
      </h1>

      <p className="mt-4 text-center text-gray-600 max-w-xl">
        Sistem persuratan digital dan asisten virtual berbasis AI
        untuk membantu proses administrasi sekolah secara efisien.
      </p>

      <div className="mt-6">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Masuk ke Sistem
        </Link>
      </div>
    </main>
  );
}
