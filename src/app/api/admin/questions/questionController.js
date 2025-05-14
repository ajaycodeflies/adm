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
export const addQuestion = async ({ label, question, options, image }) => {
  try {
    const questionCollection = await connectToDatabase();

    if (!question || !options || options.length === 0 || !image) {
      return { success: false, message: "Question and options are required." };
    }

    const processedOptions = options
      .filter((option) => option.text && option.value)
      .map((option) => ({
        text: option.text,
        value: parseInt(option.value) || 0,
      }));

    if (processedOptions.length === 0) {
      return { success: false, message: "At least one valid option is required." };
    }
    const labelId = new ObjectId(label);
    const questionCount = await questionCollection.countDocuments({ label: labelId });


    const newQuestion = {
      label: labelId,
      image,
      question,
      options: processedOptions,
      step: questionCount + 1,
      createdAt: new Date(),
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

// Get all questions with labels
export const getAllQuestions = async () => {
  try {
    const questionCollection = await connectToDatabase();
    const questions = await questionCollection
      .aggregate([
        {
          $addFields: {
            label: { $toObjectId: "$label" },
          },
        },
        {
          $lookup: {
            from: "labels",
            localField: "label",
            foreignField: "_id",
            as: "labelDetails",
          },
        },
        {
          $unwind: {
            path: "$labelDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    return {
      success: true,
      questions: questions.map((question) => ({
        ...question,
        _id: question._id.toString(),
        label: question.label?.toString(),
        labelDetails: question.labelDetails || null,
      })),
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

// Get a specific question by ID with label details
export const getQuestionById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  try {
    const questionCollection = await connectToDatabase();
    const question = await questionCollection
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: "labels",
            localField: "label",
            foreignField: "_id",
            as: "labelDetails",
          },
        },
        {
          $unwind: {
            path: "$labelDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    if (!question[0]) {
      console.warn(`Question with ID ${id} not found`);
      return null;
    }

    return {
      ...question[0],
      _id: question[0]._id.toString(),
      label: question[0].label?.toString(),
      labelDetails: question[0].labelDetails || null,
    };
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw new Error("Failed to fetch question by ID");
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

export const updateQuestion = async (id, questionData) => {
  try {
    if (!ObjectId.isValid(id)) {
      return { success: false, message: "Invalid question ID." };
    }

    const { label, question, image, options } = questionData;
    // const { label, question, image, options, step } = questionData;

    if (!question || !options || options.length === 0) {
      return {
        success: false,
        message: "Question and options are required.",
      };
    }

    const processedOptions = options
      .filter((option) => option.text && option.value)
      .map((option) => ({
        text: option.text,
        value: parseInt(option.value, 10) || 0,
      }));

    if (processedOptions.length === 0) {
      return {
        success: false,
        message: "At least one valid option is required.",
      };
    }

    const questionCollection = await connectToDatabase();

    const updateData = {
      label: new ObjectId(label),
      question,
      image,
      options: processedOptions,
      // step,
      updatedAt: new Date(),
    };

    await questionCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    const updatedQuestion = await questionCollection.findOne({ _id: new ObjectId(id) });

    if (!updatedQuestion) {
      return { success: false, message: "Question not found." };
    }

    const formattedQuestion = {
      ...updatedQuestion,
      _id: updatedQuestion._id.toString(),
      label: updatedQuestion.label.toString(),
      labelDetails: {
        label: updatedQuestion.label.toString()
      },
      options: updatedQuestion.options.map((option) => ({
        text: option.text,
        value: option.value,
      })),
    };

    return {
      success: true,
      message: "Question updated successfully.",
      question: formattedQuestion,
    };
  } catch (error) {
    console.error("Error updating question:", error);
    return { success: false, message: "Internal Server Error" };
  }
};
