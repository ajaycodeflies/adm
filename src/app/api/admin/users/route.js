import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Extract pagination parameters from the request query
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); // Default to 10 items per page
    
    // Calculate the number of documents to skip based on the page number and limit
    const skip = (page - 1) * limit;
    
    const users = await db
      .collection("users")
      .aggregate([
        {
          $match: { role: "user" }, // Filter users with role 'user'
        },
        {
          $lookup: {
            from: "sessions",
            localField: "_id",
            foreignField: "user_id",
            as: "sessionDetails",
          },
        },
        { $skip: skip }, // Skip documents for pagination
        { $limit: limit }, // Limit the number of documents
      ])
      .toArray();
    
    const totalUsers = await db.collection("users").countDocuments({ role: "user" }); // Get total count of users
    
    const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages
    
    // Return the users along with pagination metadata
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
