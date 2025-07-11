import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";
import { exit } from "process";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const users = await db
      .collection("users")
      .aggregate([
        {
          $match: { role: "user" },
        },
        {
          $lookup: {
            from: "sessions",
            localField: "_id",
            foreignField: "user_id",
            as: "sessionDetails",
          },
        },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray();

    const totalUsers = await db.collection("users").countDocuments({ role: "user" });
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({
      users,
      totalPages,
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const formData = await request.formData();

    const first_name = formData.get("first_name")?.trim();
    const last_name = formData.get("last_name")?.trim();
    const email = formData.get("email")?.trim().toLowerCase();
    const mobile = formData.get("mobile")?.trim();
    const password = formData.get("password")?.trim();
    const status = parseInt(formData.get("status")) || 0;
    const profileFile = formData.get("profile");

    // Validation
    const errors = [];
    if (!first_name) errors.push("First name is required.");
    if (!last_name) errors.push("Last name is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.");
    if (!mobile || !/^\d{10,15}$/.test(mobile)) errors.push("Valid mobile number is required.");
    if (!password || password.length < 6) errors.push("Password must be at least 6 characters.");

    // Duplicate email check
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) errors.push("Email is already registered.");

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profile image upload
    let profile = "";
    if (profileFile instanceof File) {
      const imageBuffer = Buffer.from(await profileFile.arrayBuffer());
      const imageName = `${uuidv4()}_${profileFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/users");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const imagePath = path.join(uploadDir, imageName);
      fs.writeFileSync(imagePath, imageBuffer);

      profile = `/uploads/users/${imageName}`;
    }

    // Final user object
    const newUser = {
      first_name,
      last_name,
      email,
      mobile,
      password: hashedPassword,
      status,
      role: "user",
      profile,
      created_at: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    return NextResponse.json({ success: true, user: { ...newUser, _id: result.insertedId } });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, message: "Error creating user" }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const url = new URL(request.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required." }, { status: 400 });
    }

    // Correct way to get the user document
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    // Delete profile image if it exists
    if (user.profile) {
      const imagePath = path.join(process.cwd(), "public", user.profile);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete user from DB
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Failed to delete user." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ success: false, message: "Error deleting user" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const body = await request.json();

    const { userId, first_name, last_name, email, mobile, password, status } = body;

    if (!userId || !first_name || !email || status === undefined) {
      return NextResponse.json({ success: false, error: "Required fields are missing." }, { status: 400 });
    }

    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase(),
      _id: { $ne: new ObjectId(userId) },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email is already in use by another user." }, { status: 409 });
    }

    const updateData = {
      first_name,
      last_name,
      email,
      mobile,
      status: parseInt(status),
      updated_at: new Date(),
    };

    // Only update password if it's provided
    if (password && password.trim().length > 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updateData },
      { returnDocument: "after" }
    );
    if(!result){
      return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "User updated successfully.", user: result });

  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, error: "Error updating user." }, { status: 500 });
  }
}