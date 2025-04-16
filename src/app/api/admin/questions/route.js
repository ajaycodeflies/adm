import { addQuestion, getAllQuestions, getQuestionById, deleteQuestion, updateQuestion } from "./questionController";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
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
export const POST = async (req) => {
  try {
    const formData = await req.formData();
    // console.log("Form Data:", Array.from(formData.entries()));

    const label = formData.get("label");
    const question = formData.get("question");
    const options = [];

    for (const key of formData.keys()) {
      if (key.startsWith("options")) {
        const [_, index, field] = key.match(/options\[(\d+)\]\[(.+)\]/);
        if (!options[index]) options[index] = {};
        options[index][field] = formData.get(key);
      }
    }

    if (!label || !question || !options.length || options.some((option) => !option.text || !option.value)) {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    let image = formData.get("image");
    if (image instanceof File) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageName = `${uuidv4()}_${image.name}`;
      const imagePath = path.join(process.cwd(), "public/uploads", imageName);

      fs.writeFileSync(imagePath, imageBuffer);
      image = `/uploads/${imageName}`;
    } else {
      image = null;
    }

    if (!question || !options.length || options.some((option) => !option.text || !option.value)) {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    const response = await addQuestion({
      label,
      question,
      image,
      options
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Handle GET request to fetch all questions or a single question by its ID
export async function GET(req) {
  const { nextUrl } = req;
  const id = nextUrl.searchParams.get("id");

  try {
    if (id) {
      const question = await getQuestionById(id);
      if (!question) {
        return NextResponse.json(
          { success: false, message: "Question not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(question, { status: 200 });
    } else {
      const questions = await getAllQuestions();
      return NextResponse.json(questions, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// DELETE Request (Static Route)
export async function DELETE(req) {
  const { nextUrl } = req;
  const id = nextUrl.searchParams.get("id");

  try {
    
    if (!id) {
      return NextResponse.json({ error: "Question ID is required." }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Question ID." }, { status: 400 });
    }
    
    const db = await connectToDatabase();
    const question = await getQuestionById(id);
    if (!question) {
      return NextResponse.json({ error: "Question not found." }, { status: 404 });
    }

    if (question.image) {
      const imagePath = path.join(process.cwd(), "public", question.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const deletedQuestion = await deleteQuestion(id);

    return NextResponse.json(
      { message: "Question and associated images deleted successfully."},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json({ error: "Failed to delete question." }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    // console.log("Form Data:", Array.from(formData.entries()));

    const id = formData.get("questionId");
    const label = formData.get("label");
    const question = formData.get("question");
    const options = [];

    for (const key of formData.keys()) {
      if (key.startsWith("options")) {
        const [_, index, field] = key.match(/options\[(\d+)\]\[(.+)\]/);
        if (!options[index]) options[index] = {};
        options[index][field] = formData.get(key);
      }
    }

    if (!id || !ObjectId.isValid(id)) {
      console.error("Invalid question ID.");
      return NextResponse.json({ error: "Invalid question ID." }, { status: 400 });
    }

    if (!question || !options.length || options.some((option) => !option.text || !option.value)) {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    const existingQuestion = await getQuestionById(id);

    if (!existingQuestion) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    let image = formData.get("image");
    let imagePath;

    if (image instanceof File) {
      if (existingQuestion.image) {
        const oldImagePath = path.join(process.cwd(), "public", existingQuestion.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageName = `${uuidv4()}_${image.name}`;
      imagePath = `/uploads/${imageName}`;
      const savePath = path.join(process.cwd(), "public/uploads", imageName);

      fs.writeFileSync(savePath, imageBuffer);
    } else {
      imagePath = existingQuestion.image;
    }

    const questionData = {
      label,
      question,
      image: imagePath,
      options,
    };

    const updatedQuestion = await updateQuestion(id, questionData);
    
    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json({ error: "Failed to update question." }, { status: 500 });
  }
}
