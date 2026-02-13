import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// ================= GET USERS =================
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        users.id,
        users.name,
        users.email,
        roles.role_name
      FROM users
      LEFT JOIN roles ON users.role_id = roles.id
      ORDER BY users.id DESC
    `);

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("GET USERS ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ================= DELETE USER =================
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await db.query("DELETE FROM users WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ================= EDIT USER =================
export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json();

    await db.query(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, id]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
