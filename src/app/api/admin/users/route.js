import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    
    const skip = (page - 1) * limit;
    
    const users = await db
      .collection("users")
      .aggregate([
        {
          $match: { role: "user" },
        },
        {
          $lookup: {
            from: "sessions",
            localField: "_id",
            foreignField: "user_id",
            as: "sessionDetails",
          },
        },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray();
    
    const totalUsers = await db.collection("users").countDocuments({ role: "user" });
    const totalPages = Math.ceil(totalUsers / limit);
    
    return NextResponse.json({
      users,
      totalPages,
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}
