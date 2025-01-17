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
    const email = await req.json();

    if (!email.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.email)) {
      return NextResponse.json({ success: false, message: "Invalid email" }, { status: 400 });
    }

    await db.collection("emails").insertOne({
      email: email.email,
      created_at: new Date(),
    });
    
    return NextResponse.json(
      { success: true, message: "Email saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
