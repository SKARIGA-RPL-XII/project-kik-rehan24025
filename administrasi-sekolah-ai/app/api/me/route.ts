import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Belum login" },
        { status: 401 }
      );
    }

    // Menggunakan JOIN untuk mengambil nama role dari tabel 'roles'
    // Sesuai dengan skema: users.role_id = roles.id
    const [rows]: any = await db.query(
      `SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.role_id, 
        r.role_name 
       FROM users u
       JOIN roles r ON u.role_id = r.id 
       WHERE u.id = ?`,
      [userId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { message: "User tidak ditemukan di database" },
        { status: 404 }
      );
    }

    // Mengembalikan data user lengkap dengan role_name untuk Dashboard
    return NextResponse.json(rows[0]);

  } catch (error) {
    console.error("DATABASE_ME_ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data user dari database" },
      { status: 500 }
    );
  }
}