import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 401 }
      );
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      message: "Login berhasil",
    });

    // COOKIE LOGIN
    res.cookies.set("user_id", String(user.id), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return res;

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
