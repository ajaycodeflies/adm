import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";

const connectToDatabase = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("admDigital");
    return db;
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw new Error("Database connection error");
  }
};

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const { plans } = await req.json();

    // Save plans to MongoDB
    await db.collection("plans").updateOne(
      { type: "subscription" },
      { $set: { plans } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Plans saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving plans:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const db = await connectToDatabase();

    // Fetch plans from MongoDB
    const plans = await db.collection("plans").findOne({ type: "subscription" });

    return NextResponse.json({ success: true, plans }, { status: 200 });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}    
