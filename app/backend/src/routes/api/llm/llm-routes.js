import { Router } from "express";
import { getLLMNames } from "../../../data/data.js";
import { dataSourceMiddleware } from "../middleware.js";
const llmRoutes = Router();

llmRoutes.use(dataSourceMiddleware);

// GET /api/llm
// What LLMs exist?
llmRoutes.get("/", async (req, res) => {
  try {
    if (Object.keys(req.dataSource).length === 0) {
      return res.status(200);
    }
    const names = getLLMNames(req.dataSource);
    res.status(200).json(names);
  } catch (error) {
    console.error("Error retrieving LLM names:", error);
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
