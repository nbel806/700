import e, { Router } from "express";

const llmRoutes = Router();

// GET /api/llm
// What LLMS exist?
llmRoutes.get("/", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Score for an LLM
import scoreRouter from "./score";
llmRoutes.use("/score", scoreRouter);

// LLM Data grouped or ungrouped
import groupRouter from "./group";
llmRoutes.use("/group", groupRouter);

export default llmRoutes;
