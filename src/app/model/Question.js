import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  value: { type: Number, required: true },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Question || mongoose.model("Question", questionSchema);
