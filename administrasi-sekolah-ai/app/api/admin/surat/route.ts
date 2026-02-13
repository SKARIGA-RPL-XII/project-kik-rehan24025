import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Ambil SEMUA surat untuk Admin
export async function GET() {
  try {
    const query = `
      SELECT s.*, js.nama_surat, u.name AS nama_pengaju, u.email AS email_pengaju
      FROM surat s
      JOIN jenis_surat js ON s.jenis_surat_id = js.id
      JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
    `;

    const [rows]: any = await db.query(query);
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error: any) {
    console.error("ADMIN_SURAT_GET_ERROR:", error.message);
    return NextResponse.json({ message: "Gagal mengambil data database" }, { status: 500 });
  }
}

// PATCH: Update Status (Terima/Tolak)
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    // 1. Update status surat
    await db.query("UPDATE surat SET status = ? WHERE id = ?", [status, id]);

    // 2. Catat ke log aktivitas
    await db.query(
      "INSERT INTO logs (user_id, aktivitas, created_at) VALUES (?, ?, NOW())",
      [1, `Admin mengubah status surat ID #${id} menjadi ${status}`] // Diasumsikan ID Admin adalah 1
    );

    return NextResponse.json({ message: `Surat berhasil ${status}` });
  } catch (error: any) {
    console.error("ADMIN_SURAT_PATCH_ERROR:", error.message);
    return NextResponse.json({ message: "Gagal update status" }, { status: 500 });
  }
}