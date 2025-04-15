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
    
    const emails = await db
    .collection("emails")
    .aggregate([
        { $skip: skip },
        { $limit: limit },
      ])
    .toArray();
    const totalPages = Math.ceil(emails.length / limit);
    
    return NextResponse.json({
      emails,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json({ message: "Error fetching emails" }, { status: 500 });
  }
}
