import clientPromise from "@/lib/connection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Define collections inside async functions
export async function GET(req) {
    const sessionToken = req.cookies.get("session_token")?.value;

if (!sessionToken || typeof sessionToken !== "string") {
    console.error("Invalid or missing session token");
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}

try {
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);

    // Proceed with your logic
    console.log("Decoded Token:", decoded);
    const client = await clientPromise;
    const db = client.db("admDigital");
    const user = await db.collection("users").findOne({ _id: decoded.userId });

    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
        success: true,
        data: {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profileImage: user.profileImage || "/images/admin/default-profile.jpg",
        },
    });
} catch (error) {
    console.error("API Error:", error.stack || error.message);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
} 
}

// export async function POST(req) {
//     try {
//         const client = await clientPromise;
//         const db = client.db("admDigital");
//         const usersCollection = db.collection("users");
//         const sessionsCollection = db.collection("sessions");

//         const sessionToken = req.cookies.get("session_token");

//         if (!sessionToken) {
//             return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//         }

//         const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET); // Adjust JWT_SECRET as needed
//         const sessionData = await sessionsCollection.findOne({ session_token: sessionToken });
//         if (!sessionData) {
//             return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 });
//         }

//         const userData = await usersCollection.findOne({ _id: sessionData.user_id });
//         if (!userData) {
//             return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
//         }

//         const body = await req.json();
//         userData.first_name = body.firstName || userData.first_name;
//         userData.last_name = body.lastName || userData.last_name;
//         userData.email = body.email || userData.email;

//         if (body.profileImage) {
//             userData.profileImage = body.profileImage;
//         }

//         await usersCollection.updateOne(
//             { _id: userData._id },
//             { $set: userData }
//         );

//         return NextResponse.json({
//             success: true,
//             message: "Profile updated successfully.",
//         });
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         return NextResponse.json({ success: false, message: "Error updating profile." }, { status: 500 });
//     }
// }
