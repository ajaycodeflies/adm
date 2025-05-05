// src/app/api/user/profile/route.js
import clientPromise from "@/lib/connection";

export async function GET(req) {
  try {
    const sessionToken = req.cookies.get("user_session_token")?.value;
    console.log('sessionToken');
    if (!sessionToken || typeof sessionToken !== "string") {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("admDigital");
    const session = await db.collection("sessions").findOne({
      session_token: sessionToken,
    });

    if (!session || !session.user_id) {
      return new Response(
        JSON.stringify({ success: false, message: "Session expired or invalid" }),
        { status: 401 }
      );
    }

    const user = await db.collection("users").findOne({ _id: session.user_id });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
