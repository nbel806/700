import { Router } from "express";
import { runPythonScript } from "../../../src/python/execute-app-dot-py.js";

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
    const { prompts, groups, llm, continuations } = req.body;

    let lowerLLM = "";
    if (llm === "GPT-2") {
      lowerLLM = "gpt2";
    }

    // Call the Python script
    const { stdout, isDone } = await runPythonScript(
      prompts,
      groups,
      lowerLLM,
      continuations
    );

    // Send the output as a response
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default generateRouter;
