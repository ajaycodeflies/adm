// src/app/api/admin/logout/route.js
import clientPromise from "@/lib/connection";

export async function POST(request) {
  try {
    const { session_token } = await request.json();

    if (!session_token) {
      return new Response(
        JSON.stringify({ message: "Session token is required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("admDigital");
    const sessionsCollection = db.collection("sessions");

    const result = await sessionsCollection.deleteOne({ session_token });

    if (!result.deletedCount) {
      return new Response(
        JSON.stringify({ message: "Invalid session token" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Logout successful" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
