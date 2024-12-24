import multer from "multer";
import { addQuestion, getAllQuestions, getQuestionById, deleteQuestion, updateQuestion } from "./questionController";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

// Disable body parsing as multer will handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    console.log("Form Data:", Array.from(formData.entries()));

    const question = formData.get("question");
    const options = [];

    // Process each option and handle the associated image files
    for (const key of formData.keys()) {
      if (key.startsWith("options")) {
        const [_, index, field] = key.match(/options\[(\d+)\]\[(.+)\]/);
        if (!options[index]) options[index] = {};
        options[index][field] = formData.get(key);
      }
    }

    console.log("Parsed Options:", options);

    // Process images for each option
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      
      // Handle image for the option if it exists
      if (option.image instanceof File) {
        const imageBuffer = Buffer.from(await option.image.arrayBuffer());
        const imageName = `${uuidv4()}_${option.image.name}`;
        const imagePath = path.join(process.cwd(), "public/uploads", imageName);

        fs.writeFileSync(imagePath, imageBuffer);
        options[i].image = `/uploads/${imageName}`; // Update the image path to store in DB
      } else {
        options[i].image = null; // If no image, ensure it's set to null
      }
    }

    // Check if question and options are valid
    if (!question || !options.length) {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    const response = await addQuestion({
      question,
      options, // Pass options directly, including images for each option
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
  const id = nextUrl.searchParams.get("id"); // Capture the dynamic ID from the URL query

  try {
    if (id) {
      // Fetch a single question by ID (for editing)
      const question = await getQuestionById(id);
      if (!question) {
        return NextResponse.json(
          { success: false, message: "Question not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(question, { status: 200 });
    } else {
      // Fetch all questions
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


// Handle PUT request to update an existing question
export async function PUT(req) {
  try {
    const data = await req.json();
    const { id, question, options } = data;

    if (!id || !question || !Array.isArray(options)) {
      return NextResponse.json(
        { success: false, message: "Invalid data format" },
        { status: 400 }
      );
    }

    const updatedQuestion = await updateQuestion(id, { question, options });

    if (!updatedQuestion) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete a question
export async function DELETE(req) {
  try {
    const { id } = req.query;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Question ID is required" },
        { status: 400 }
      );
    }

    const deletedQuestion = await deleteQuestion(id);

    if (!deletedQuestion) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Question deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
