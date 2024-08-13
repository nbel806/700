import { Router } from "express";

const groupRouter = Router();

// GET /api/llm/group/:llm
// What demographic groups exist for an LLM?
groupRouter.get("/:llm", async (req, res) => {
  try {
    const { llm } = req.params;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/llm/group/data/:llm/:grouped?
// Data for an llm, grouped or ungrouped
groupRouter.get("/data/:llm/:grouped?", async (req, res) => {
  try {
    const { llm, grouped } = req.params;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default groupRouter;
