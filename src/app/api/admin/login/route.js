import clientPromise from "@/lib/connection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and Password are required" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("admDigital");
    const usersCollection = db.collection("users");
    const sessionsCollection = db.collection("sessions");

    const user = await usersCollection.findOne({ email, role: "admin" });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    const sessionToken = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
    await sessionsCollection.insertOne({
      user_id: user._id,
      session_token: sessionToken,
      expired_at: new Date(Date.now() + 3600000),
    });

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: {
        "Set-Cookie": `admin_session_token=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
