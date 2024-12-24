import express from "express";
import {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
} from "./questionController.js";

const router = express.Router();

// Add a new question
router.post("/", addQuestion);

// Get all questions
router.get("/", getAllQuestions);

// Get a specific question by ID
router.get("/:id", getQuestionById);

// Delete a question
router.delete("/:id", deleteQuestion);

export default router;
