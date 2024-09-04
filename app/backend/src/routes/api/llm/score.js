import { Router } from "express";
import { getLLMScore } from "../../../data/data.js";
const scoreRouter = Router();

// GET /api/llm/score/:llm
// Score for an LLM
scoreRouter.get("/:llm", async (req, res) => {
  const { llm } = req.params;
  try {
    const score = getLLMScore(llm, req.dataSource);
    res.status(200).json({ score });
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve the score for ${llm}.` });
  }
});

export default scoreRouter;
