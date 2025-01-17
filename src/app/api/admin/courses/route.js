import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";


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
        const formData = await req.formData();

        const title = formData.get("title");
        const name = formData.get("name");
        const status = '1';
        console.log("Form Data:", Array.from(formData.entries()));
        let image = formData.get("image");
        if (image instanceof File) {
            const imageBuffer = Buffer.from(await image.arrayBuffer());
            const imageName = `${uuidv4()}_${image.name}`;
            const imagePath = path.join(process.cwd(), "public/uploads/courses", imageName);

            fs.writeFileSync(imagePath, imageBuffer);
            image = `/uploads/courses/${imageName}`;
        } else {
            image = null;
        }

        if (!title || !name || !status) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        await db.collection("courses").insertOne({
            image,
            title,
            name,
            status,
            created_at: new Date(),
        });
        return NextResponse.json({ success: true, message: "Course saved successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error saving course:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const courses = await db.collection("courses").find({}).toArray();
        return NextResponse.json({ success: true, courses }, { status: 200 });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req) {
  const { nextUrl } = req;
  const id = nextUrl.searchParams.get("id");

  try {
    const db = await connectToDatabase();

    if (!id) {
      return NextResponse.json({ error: "Course ID is required." }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Course ID." }, { status: 400 });
    }
    
    const existingCourse = await db.collection("courses").findOne({ _id: new ObjectId(id) });
    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    if (existingCourse.image) {
      const imagePath = path.join(process.cwd(), "public", existingCourse.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const deletedCourse = await db.collection("courses").findOneAndDelete({
        _id: new ObjectId(id),
    });

    return NextResponse.json(
      { success: true, message: "Course deleted successfully."},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ success: false, error: "Failed to delete course." }, { status: 500 });
  }
}

export async function PUT(req) {
    const db = await connectToDatabase();
    try {
        const formData = await req.formData();

        const courseId = formData.get("courseId");
        const title = formData.get("title");
        const name = formData.get("name");
        const status = formData.get("status");
        
        if (!courseId || !ObjectId.isValid(courseId)) {
            console.error("Invalid course ID.");
            return NextResponse.json({ error: "Invalid course ID." }, { status: 400 });
        }

        if (!title || !name || !status) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const existingCourse = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

        if (!existingCourse) {
            return NextResponse.json(
                { success: false, message: "Course not found" },
                { status: 404 }
            );
        }

        let image = formData.get("image");
        let imagePath;

        if (image instanceof File) {
            if (existingCourse.image) {
                const oldImagePath = path.join(process.cwd(), "public", existingCourse.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            const imageBuffer = Buffer.from(await image.arrayBuffer());
            const imageName = `${uuidv4()}_${image.name}`;
            imagePath = `/uploads/courses/${imageName}`;
            const savePath = path.join(process.cwd(), "public/uploads/courses", imageName);

            fs.writeFileSync(savePath, imageBuffer);
        } else {
            imagePath = existingCourse.image;
        }

        const updatedCourse = await db.collection("courses").findOneAndUpdate(
            { _id: new ObjectId(courseId) },
            {
                $set: {
                    image: imagePath,
                    title,
                    name,
                    status,
                    updated_at: new Date(),
                },
            },
            { returnDocument: "after" }
        );

        return NextResponse.json(
            { success: true, message: "Course updated successfully!", course: updatedCourse },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating level:", error);
        return NextResponse.json({ error: "Failed to update level." }, { status: 500 });
    }
}
