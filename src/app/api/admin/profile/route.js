import clientPromise from "@/lib/connection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

// Connect to the database
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

export const PUT = async (req) => {
    try {
        const formData = await req.formData();
        console.log("Form Data:", Array.from(formData.entries()));

        const firstName = formData.get("first_name");
        const lastName = formData.get("last_name");
        const email = formData.get("email");
        const mobile = formData.get("mobile");
        const password = formData.get("password");

        const sessionToken = req.cookies.get("session_token")?.value;

        if (!sessionToken || typeof sessionToken !== "string") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();

        const session = await db.collection("sessions").findOne({ session_token: sessionToken });

        if (!session || !session.user_id) {
            return NextResponse.json({ success: false, message: "Session expired or invalid" }, { status: 401 });
        }

        const user = await db.collection("users").findOne({ _id: session.user_id });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (user.role !== "admin") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        if (!firstName || !email) {
            return NextResponse.json({ success: false, message: "Missing required fields (first_name, email)" }, { status: 400 });
        }

        // Declare profile in the outer scope
        let profile = user.profile;

        if (formData.has("profile")) {
            const profileImage = formData.get("profile");
            if (profileImage instanceof File) {
                // Remove the old profile image if it exists
                if (profile && profile.startsWith("/uploads/profile/")) {
                    const oldImagePath = path.join(process.cwd(), "public", profile);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }

                const imageBuffer = Buffer.from(await profileImage.arrayBuffer());
                const imageName = `${uuidv4()}_${profileImage.name}`;
                const uploadDir = path.join(process.cwd(), "public/uploads/profile");

                // Ensure the directory exists
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const imagePath = path.join(uploadDir, imageName);

                // Write the file to the server
                fs.writeFileSync(imagePath, imageBuffer);
                profile = `/uploads/profile/${imageName}`;
            }
        }

        const updatedProfile = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            mobile: mobile,
            profile, // Use the updated or original profile
        };

        await db.collection("users").updateOne(
            { _id: session.user_id },
            { $set: updatedProfile }
        );

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.collection("users").updateOne({ _id: session.user_id }, { $set: { password: hashedPassword } });
        }

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            newProfileImage: updatedProfile.profile,
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating admin profile:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
};




// GET - Fetch Profile
export async function GET(req) {
    try {
        const sessionToken = req.cookies.get("admin_session_token")?.value;
        if (!sessionToken || typeof sessionToken !== "string") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const db = await connectToDatabase();

        const session = await db.collection("sessions").findOne({
            session_token: sessionToken,
        });

        if (!session || !session.user_id) {
            return NextResponse.json({ success: false, message: "Session expired or invalid" }, { status: 401 });
        }

        const user = await db.collection("users").findOne({ _id: session.user_id });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
