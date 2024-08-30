import { Router } from "express";

const generateRouter = Router();

// POST /api/generate
// Generate new llm data
// Body example:
// {
//   "llms": [],
//   "continutations": [],
//   "groups": [],
//   "prompts": [],
// }

generateRouter.post("/", async (req, res) => {
  try {
    req.body;
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default generateRouter;
