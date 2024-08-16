import { Router } from "express";
import { getLLMNames } from "../../../data/data.js";
const llmRoutes = Router();

// GET /api/llm
// What LLMS exist?
llmRoutes.get("/", async (req, res) => {
  try {
    const names = getLLMNames();
    res.status(200).json(names);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve LLM names." });
  }
});

// Score for an LLM
import scoreRouter from "./score.js";
llmRoutes.use("/score", scoreRouter);

// LLM Data grouped or ungrouped
import groupRouter from "./group.js";
llmRoutes.use("/group", groupRouter);

export default llmRoutes;
