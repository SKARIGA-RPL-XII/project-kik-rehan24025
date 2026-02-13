import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

/*
===========================================================
GET SURAT
===========================================================
*/
export async function GET() {
  try {
    const cookieStore = await cookies(); // WAJIB await di Next 16
    const userIdCookie = cookieStore.get("user_id")?.value;
    const roleId = cookieStore.get("role_id")?.value;

    if (!userIdCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(userIdCookie);

    let query = "";
    let params: any[] = [];

    if (roleId === "1") {
      // ADMIN → ambil semua surat
      query = `
        SELECT s.*, js.nama_surat, u.name AS nama_pengaju
        FROM surat s
        JOIN jenis_surat js ON s.jenis_surat_id = js.id
        JOIN users u ON s.user_id = u.id
        ORDER BY s.created_at DESC
      `;
    } else {
      // USER → hanya surat miliknya
      query = `
        SELECT s.*, js.nama_surat
        FROM surat s
        JOIN jenis_surat js ON s.jenis_surat_id = js.id
        WHERE s.user_id = ?
        ORDER BY s.created_at DESC
      `;
      params = [userId];
    }

    const [rows]: any = await db.query(query, params);

    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error: any) {
    console.error("SURAT GET ERROR:", error.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

/*
===========================================================
POST AJUKAN SURAT
===========================================================
*/
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get("user_id")?.value;

    if (!userIdCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(userIdCookie);
    const { judul, jenis, isi } = await req.json();

    if (!judul || !jenis || !isi) {
      return NextResponse.json({ message: "Data belum lengkap" }, { status: 400 });
    }

    const [jenisRow]: any = await db.query(
      "SELECT id FROM jenis_surat WHERE nama_surat = ?",
      [jenis]
    );

    if (!jenisRow.length) {
      return NextResponse.json(
        { message: "Kategori surat tidak ditemukan" },
        { status: 400 }
      );
    }

    const jenisSuratId = jenisRow[0].id;

    await db.query(
      `INSERT INTO surat (user_id, jenis_surat_id, judul, isi_surat, status, created_at)
       VALUES (?, ?, ?, ?, 'menunggu', NOW())`,
      [userId, jenisSuratId, judul, isi]
    );

    await db.query(
      "INSERT INTO logs (user_id, aktivitas, created_at) VALUES (?, ?, NOW())",
      [userId, `Mengajukan surat baru: ${judul}`]
    );

    return NextResponse.json({ message: "Surat berhasil diajukan" });
  } catch (error: any) {
    console.error("SURAT POST ERROR:", error.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

/*
===========================================================
PATCH UPDATE STATUS (ADMIN ONLY)
===========================================================
*/
export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const roleId = cookieStore.get("role_id")?.value;

    if (roleId !== "1") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { message: "ID atau status tidak valid" },
        { status: 400 }
      );
    }

    await db.query(
      "UPDATE surat SET status = ? WHERE id = ?",
      [status, id]
    );

    await db.query(
      "INSERT INTO logs (user_id, aktivitas, created_at) VALUES (1, ?, NOW())",
      [`Admin mengubah status surat #${id} menjadi ${status}`]
    );

    return NextResponse.json({
      message: `Surat berhasil di-${status}`,
    });
  } catch (error: any) {
    console.error("SURAT PATCH ERROR:", error.message);
    return NextResponse.json(
      { message: "Gagal memproses surat" },
      { status: 500 }
    );
  }
}
