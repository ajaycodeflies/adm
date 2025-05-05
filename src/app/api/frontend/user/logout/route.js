import clientPromise from "@/lib/connection";

export async function POST(request) {
  try {
    const sessionToken = request.cookies.get("user_session_token")?.value;

    if (sessionToken) {
      const client = await clientPromise;
      const db = client.db("admDigital");
      await db.collection("sessions").deleteOne({ session_token: sessionToken });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Logged out successfully" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `user_session_token=deleted; Path=/; HttpOnly; Max-Age=0`,
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Logout failed" }),
      { status: 500 }
    );
  }
}
