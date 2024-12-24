import mongoose from "mongoose";

    const OptionSchema = new mongoose.Schema({
        text: { type: String, required: true },
        value: { type: Number, required: true },
        image: { type: String, required: true }, // Make image required
    });
  
    const QuestionSchema = new mongoose.Schema(
        {
        question: { type: String, required: true },
        options: { type: [OptionSchema], required: true },
        image: { type: String, required: true }, // Make image required for the question itself
        },
        { timestamps: true }
    );
  

const Question = mongoose.models.Question || mongoose.model("Question", QuestionSchema);

export default Question;
