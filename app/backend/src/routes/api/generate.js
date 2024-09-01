import { Router } from "express";
import { runPythonScript } from "../../../src/python/execute-app-dot-py.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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
    switch (llm) {
      case "GPT-2":
        lowerLLM = "gpt2";
        break;
      case "BERT":
        lowerLLM = "bert";
        break;
      case "PHI":
        lowerLLM = "phi";
        break;
      case "LLAMA":
        lowerLLM = "llama";
        break;
      case "GEMMA":
        lowerLLM = "gemma";
        break;
    }

    // Call the Python script
    const { stdout, isDone } = await runPythonScript(
      prompts,
      groups,
      lowerLLM,
      continuations
    );

    // Send the output as a response
    res.json({ output: stdout, isDone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/generate/download
generateRouter.get("/download", async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  try {
    const excelFilePath = join(__dirname, "../../../BiasTool.xlsx");
    console.log(excelFilePath);

    res.download(excelFilePath, "BiasTool.xlsx", (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        res.status(500).json({ error: "Error downloading the file" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default generateRouter;
