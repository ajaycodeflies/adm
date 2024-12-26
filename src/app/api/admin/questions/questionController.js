import clientPromise from "@/lib/connection";
import { ObjectId } from "mongodb";

const connectToDatabase = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("admDigital");
    return db.collection("questions");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw new Error("Database connection error");
  }
};

// Add a new question
export const addQuestion = async ({ question, options }) => {
  try {
    const questionCollection = await connectToDatabase();

    if (!question || !options || options.length === 0) {
      return { success: false, message: "Question and options are required." };
    }

    const processedOptions = options
      .filter((option) => option.text && option.value)
      .map((option) => ({
        text: option.text,
        value: parseInt(option.value) || 0,
        image: option.image || null, // Store image if it exists, else null
      }));

    if (processedOptions.length === 0) {
      return { success: false, message: "At least one valid option is required." };
    }

    const newQuestion = {
      question,
      options: processedOptions,
      createdAt: new Date(), // Add a timestamp for when the question was created
    };
    
    const result = await questionCollection.insertOne(newQuestion);

    return {
      success: true,
      message: "Question added successfully",
      question: { _id: result.insertedId, ...newQuestion },
    };
  } catch (error) {
    console.error("Error adding question:", error);
    return { success: false, message: "Internal Server Error" };
  }
};



// Get all questions
export const getAllQuestions = async () => {
  try {
    const questionCollection = await connectToDatabase();
    const questions = await questionCollection.find({}).toArray();

    return {
      success: true,
      questions,
    };
  } catch (error) {
   console.error("Error fetching questions:", error);
  }    
}

// Get a specific question by ID
export async function getQuestionById(id) {
  try {
    const questionCollection = await connectToDatabase();
    const question = await questionCollection.findOne({ _id: new ObjectId(id) });
    return question;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw new Error("Failed to fetch question");
  }
}

// Update an existing question by ID
export const updateQuestion = async (id, { question, options }) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, options },
      { new: true } // Returns the updated question
    );

    return updatedQuestion;
  } catch (error) {
    console.error("Error updating question:", error);
    return null;
  }
};


export const deleteQuestion = async (id) => {
  try {
    const questionCollection = await connectToDatabase();
    const result = await questionCollection.findOneAndDelete({ _id: new ObjectId(id) });
    if (result.value) {
      return { success: true, message: "Question deleted successfully" };
    } else {
      return { success: false, message: "Question not found" };
    }
  } catch (error) {
    console.error("Error deleting question:", error);
    return { success: false, message: "Internal Server Error" };
  }
};
