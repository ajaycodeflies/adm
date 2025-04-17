import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const totalUsers = await db.collection("users").countDocuments();
    const recentUsers = await db
      .collection("users")
      .find({ profile: { $exists: true, $ne: "" } })
      .sort({ created_at: -1 })
      .limit(5)
      .project({ profile: 1, _id: 0 })
      .toArray();
    console.log(recentUsers);
    return NextResponse.json({
      success: true,
      total: totalUsers,
      avatars: recentUsers.map(user => user.profile),
    });
  } catch (error) {
    console.error("Error fetching landing user data:", error);
    return NextResponse.json({ success: false, error: "Failed to load data." }, { status: 500 });
  }
}
