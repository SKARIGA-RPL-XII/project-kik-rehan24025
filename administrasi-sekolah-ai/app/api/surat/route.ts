import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

/*
=====================
GET SURAT USER
=====================
*/
export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT * FROM surat WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    return NextResponse.json(rows);

  } catch (error) {
    console.error("SURAT GET ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/*
=====================
POST AJUKAN SURAT
=====================
*/
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { judul, jenis, penerima, isi } = await req.json();

    if (!judul || !jenis || !penerima || !isi) {
      return NextResponse.json(
        { message: "Data belum lengkap" },
        { status: 400 }
      );
    }

    await db.query(
      `INSERT INTO surat 
       (judul, jenis, penerima, isi, status, user_id) 
       VALUES (?, ?, ?, ?, 'menunggu', ?)`,
      [judul, jenis, penerima, isi, userId]
    );

    return NextResponse.json({
      message: "Surat berhasil diajukan",
    });

  } catch (error) {
    console.error("SURAT POST ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
