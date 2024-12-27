import { addQuestion, getAllQuestions, getQuestionById, deleteQuestion, updateQuestion } from "./questionController";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import clientPromise from "@/lib/connection";
import { ObjectId } from "mongodb";
import { log } from "console";

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

    const question = formData.get("question");
    const options = [];

    for (const key of formData.keys()) {
      if (key.startsWith("options")) {
        const [_, index, field] = key.match(/options\[(\d+)\]\[(.+)\]/);
        if (!options[index]) options[index] = {};
        options[index][field] = formData.get(key);
      }
    }

    // console.log("Parsed Options:", options);

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      
      if (option.image instanceof File) {
        const imageBuffer = Buffer.from(await option.image.arrayBuffer());
        const imageName = `${uuidv4()}_${option.image.name}`;
        const imagePath = path.join(process.cwd(), "public/uploads", imageName);

        fs.writeFileSync(imagePath, imageBuffer);
        options[i].image = `/uploads/${imageName}`; 
      } else {
        options[i].image = null;
      }
    }

    if (!question || !options.length) {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    const response = await addQuestion({
      question,
      options,
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
    
    const imagePaths = [];
    question.options.forEach(option => {
      if (option.image) {
        imagePaths.push(path.join(process.cwd(), "public", option.image));
      }
    });

    imagePaths.forEach(imagePath => {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

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
