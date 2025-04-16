import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const totalCount = await db.collection("emails").countDocuments();

    const emails = await db
      .collection("emails")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalPages = Math.ceil(totalCount / limit);

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

export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Email ID" }, { status: 400 });
    }

    const result = await db.collection("emails").findOneAndDelete({
      _id: new ObjectId(id)
    });

    return NextResponse.json(
      { message: "Email deleted successfully.", email: result.value },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json({ message: "Error deleting email" }, { status: 500 });
  }
}

