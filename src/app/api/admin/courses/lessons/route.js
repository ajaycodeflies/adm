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
        const level_id = formData.get('level');
        const title = formData.get("title");
        const question = formData.get("question");
        const description = formData.get("description");
        const status = '1';

        if (!title || !question || !course_id || !level_id || !description) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        await db.collection("course_lessons").insertOne({
            course_id,
            level_id,
            title,
            question,
            status,
            description,
            created_at: new Date(),
        });
        return NextResponse.json({ success: true, message: "Lesson added successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error saving lesson:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    try {
        const db = await connectToDatabase();

        if (!courseId) {
            const lessons = await db.collection("course_lessons")
                .aggregate([
                    {
                        $addFields: {
                            course_id_object: { $toObjectId: "$course_id" },
                            level_id_object: { $toObjectId: "$level_id" },
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
                    {
                        $lookup: {
                            from: "course_levels",
                            localField: "level_id_object",
                            foreignField: "_id",
                            as: "level_details",
                        },
                    },
                    { $unwind: "$level_details" },
                ])
                .toArray();
            return NextResponse.json({ success: true, lessons }, { status: 200 });
        } else {
            if (!ObjectId.isValid(courseId)) {
                return NextResponse.json({ success: false, message: "Invalid or missing course ID" }, { status: 400 });
            }
            const lessons = await db.collection("course_lessons")
                .aggregate([
                    { $match: { course_id: new ObjectId(courseId) } },
                    {
                        $lookup: {
                            from: "courses",
                            localField: "course_id",
                            foreignField: "_id",
                            as: "course_details",
                        },
                    },
                    { $unwind: "$course_details" },
                    {
                        $lookup: {
                            from: "course_levels",
                            localField: "level_id",
                            foreignField: "_id",
                            as: "level_details",
                        },
                    },
                    { $unwind: "$level_details" },
                ])
                .toArray();

            return NextResponse.json({ success: true, lessons }, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching lessons:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch lessons" }, { status: 500 });
    }
}

export async function DELETE(req) {
    const { nextUrl } = req;
    const id = nextUrl.searchParams.get("id");

    try {
        const db = await connectToDatabase();

        if (!id) {
            return NextResponse.json({ error: "Lesson ID is required." }, { status: 400 });
        }

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid Lesson ID." }, { status: 400 });
        }

        const existingLesson = await db.collection("course_lessons").findOne({ _id: new ObjectId(id) });
        if (!existingLesson) {
            return NextResponse.json({ error: "This lesson not found." }, { status: 404 });
        }

        const deletedLesson = await db.collection("course_lessons").findOneAndDelete({
            _id: new ObjectId(id),
        });

        return NextResponse.json(
            { success: true, message: "Lesson deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting lesson:", error);
        return NextResponse.json({ success: false, error: "Failed to delete lesson." }, { status: 500 });
    }
}

export async function PUT(req) {
    const db = await connectToDatabase();
    try {
        const formData = await req.formData();

        const lessonId = formData.get("lessonId");
        const courseId = formData.get("courseId");
        const levelId = formData.get("levelId");
        const title = formData.get("title");
        const question = formData.get("question");
        const description = formData.get("description");
        const status = formData.get("status");

        // console.log("Form Data:", Array.from(formData.entries()));
        if (!lessonId || !ObjectId.isValid(lessonId)) {
            return NextResponse.json({ error: "Invalid lesson ID." }, { status: 400 });
        }

        if (!levelId || !ObjectId.isValid(levelId)) {
            return NextResponse.json({ error: "Invalid level ID." }, { status: 400 });
        }

        if (!courseId || !ObjectId.isValid(courseId)) {
            return NextResponse.json({ error: "Invalid course ID." }, { status: 400 });
        }

        if (!title || !question || !description || !status) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const existingLesson = await db.collection("course_lessons").findOne({ _id: new ObjectId(lessonId) });
        if (!existingLesson) {
            return NextResponse.json({ error: "This lesson not found." }, { status: 404 });
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

        await db.collection("course_lessons").updateOne(
            { _id: new ObjectId(lessonId) },
            {
                $set: {
                    course_id: courseId,
                    level_id: levelId,
                    title,
                    question,
                    description,
                    status,
                    updated_at: new Date(),
                },
            }
        );

        const updatedLesson = await db.collection("course_lessons").aggregate([
            {
                $match: { _id: new ObjectId(lessonId) },
            },
            {
                $addFields: {
                    course_id_object: { $toObjectId: "$course_id" },
                    level_id_object: { $toObjectId: "$level_id" },
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
            {
                $lookup: {
                    from: "course_levels",
                    localField: "level_id_object",
                    foreignField: "_id",
                    as: "level_details",
                },
            },
            { $unwind: "$level_details" },
        ]).toArray();

        return NextResponse.json(
            { success: true, message: "Lesson updated successfully!", lesson: updatedLesson },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Failed to update lesson." }, { status: 500 });
    }
}