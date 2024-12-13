import clientPromise from "@/lib/connection";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req) {
    const sessionToken = req.cookies.get("session_token")?.value;

    if (!sessionToken || typeof sessionToken !== "string") {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("admDigital");

        const session = await db.collection("sessions").findOne({
            session_token: sessionToken,
            expired_at: { $gte: new Date() },
        });

        if (!session || !session.user_id) {
            return NextResponse.json({ success: false, message: "Session expired or invalid" }, { status: 401 });
        }

        const user = await db.collection("users").findOne({ _id: new ObjectId(session.user_id) });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                firstName: user.first_name || "Admin",
                lastName: user.last_name || "",
                email: user.email || "N/A",
                mobile: user.mobile || "N/A",
                profileImage: user.profile || "/images/admin/profile.jpg",
            },
        });
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
