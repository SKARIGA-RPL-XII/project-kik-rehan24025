import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const { name, email, userId } = await req.json();

    // 1. Koneksi ke Database
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "admin_sekolah_ai",
    });

    // 2. Update data di tabel users
    // Asumsi: Kita mengupdate berdasarkan ID user
    const [result]: any = await connection.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, userId]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profil berhasil diperbarui" });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}