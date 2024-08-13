import { Router } from "express";

const scoreRouter = Router();

// GET /api/llm/score/:llm
// Score for an LLM
scoreRouter.get("/:llm", async (req, res) => {
  try {
    const { llm } = req.params;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default scoreRouter;
