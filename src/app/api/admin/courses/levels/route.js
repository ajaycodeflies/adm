import { NextResponse } from "next/server";
import clientPromise from "@/lib/connection";
import { ObjectId } from "mongodb";

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

        const course_id = formData.get('course');
        const step = formData.get("step");
        const title = formData.get("title");
        const status = '1';

        if (!title || !step || !course_id) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        await db.collection("course_levels").insertOne({
            course_id,
            step,
            title,
            status,
            created_at: new Date(),
        });
        return NextResponse.json({ success: true, message: "Level saved successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error saving level:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    try {
        const db = await connectToDatabase();
        if (!courseId) {
            const levels = await db.collection("course_levels").aggregate([
                {
                    $addFields: {
                        course_id_object: { $toObjectId: "$course_id" }
                    }
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "course_id_object",
                        foreignField: "_id",
                        as: "course_details"
                    }
                },
                {
                    $unwind: "$course_details"
                }
            ]).toArray();

            return NextResponse.json({ success: true, levels }, { status: 200 });
        } else {
            if (!ObjectId.isValid(courseId)) {
                return NextResponse.json({ success: false, message: "Invalid or missing course ID" }, { status: 400 });
            }
            const levels = await db.collection("course_levels")
                .aggregate([
                    { $match: { course_id: courseId } },
                    {
                        $addFields: {
                            course_id_object: { $toObjectId: "$course_id" },
                        },
                    },
                    {
                        $lookup: {
                            from: "courses",
                            localField: "course_id_object",
                            foreignField: "_id",
                            as: "course_details",
                        },
                    },
                    { $unwind: "$course_details" },
                ])
                .toArray();
            return NextResponse.json({ success: true, levels }, { status: 200 });

        }

    } catch (error) {
        console.error("Error fetching levels:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch levels" }, { status: 500 });
    }
}


export async function DELETE(req) {
    const { nextUrl } = req;
    const id = nextUrl.searchParams.get("id");

    try {
        const db = await connectToDatabase();

        if (!id) {
            return NextResponse.json({ error: "Level ID is required." }, { status: 400 });
        }

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid Level ID." }, { status: 400 });
        }

        const existingLevel = await db.collection("course_levels").findOne({ _id: new ObjectId(id) });
        if (!existingLevel) {
            return NextResponse.json({ error: "Level not found." }, { status: 404 });
        }

        const deletedLevel = await db.collection("course_levels").findOneAndDelete({
            _id: new ObjectId(id),
        });

        return NextResponse.json(
            { success: true, message: "Level deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting level:", error);
        return NextResponse.json({ success: false, error: "Failed to delete level." }, { status: 500 });
    }
}

export async function PUT(req) {
    const db = await connectToDatabase();
    try {
        const formData = await req.formData();

        const levelId = formData.get("levelId");
        const courseId = formData.get("course");
        const title = formData.get("title");
        const step = formData.get("step");
        const status = formData.get("status");

        if (!levelId || !ObjectId.isValid(levelId)) {
            console.error("Invalid level ID.");
            return NextResponse.json({ error: "Invalid level ID." }, { status: 400 });
        }

        if (!courseId || !ObjectId.isValid(courseId)) {
            console.error("Invalid course ID.");
            return NextResponse.json({ error: "Invalid course ID." }, { status: 400 });
        }

        if (!title || !step || !status) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const existingCourse = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

        if (!existingCourse) {
            return NextResponse.json(
                { success: false, message: "Course not found" },
                { status: 404 }
            );
        }
        const existingLevel = await db.collection("course_levels").findOne({ _id: new ObjectId(levelId) });
        if (!existingLevel) {
            return NextResponse.json(
                { success: false, message: "Level not found" },
                { status: 404 }
            );
        }

        await db.collection("course_levels").updateOne(
            { _id: new ObjectId(levelId) },
            {
                $set: {
                    course_id: courseId,
                    step,
                    title,
                    status,
                    updated_at: new Date(),
                },
            }
        );

        const updatedLevel = await db.collection("course_levels").aggregate([
            {
                $match: { _id: new ObjectId(levelId) },
            },
            {
                $addFields: {
                    course_id_object: { $toObjectId: "$course_id" },
                },
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "course_id_object",
                    foreignField: "_id",
                    as: "course_details",
                },
            },
            {
                $unwind: "$course_details",
            },
        ]).toArray();

        return NextResponse.json(
            { success: true, message: "Level updated successfully!", level: updatedLevel },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating level:", error);
        return NextResponse.json({ error: "Failed to update level." }, { status: 500 });
    }
}