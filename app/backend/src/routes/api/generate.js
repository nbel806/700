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
    const { prompts, groups, llms, continuations } = req.body;
    console.log("req.body", req.body);

    const firstLLM = llms[0];
    let llm = "";
    if (firstLLM === "GPT-2") {
      llm = "gpt2";
    }

    // Call the Python script
    console.log("trying");
    const output = await runPythonScript(prompts, groups, llm, continuations);
    console.log("outputed");

    // Send the output as a response
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default generateRouter;
