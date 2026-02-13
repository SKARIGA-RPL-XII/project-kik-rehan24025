import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [[surat]]: any = await db.query(
      "SELECT COUNT(*) as total FROM surat"
    );

    const [[users]]: any = await db.query(
      "SELECT COUNT(*) as total FROM users"
    );

    const [[logs]]: any = await db.query(
      "SELECT COUNT(*) as total FROM logs"
    );

    const [[done]]: any = await db.query(
      "SELECT COUNT(*) as total FROM surat WHERE status='selesai'"
    );

    return NextResponse.json({
      totalSurat: surat.total,
      totalUser: users.total,
      totalLogs: logs.total,
      taskDone: done.total
    });

  } catch (error) {
    console.error("API STATS ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dashboard" },
      { status: 500 }
    );
  }
}
