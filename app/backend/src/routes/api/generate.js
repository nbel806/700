import { Router } from "express";
import { runPythonScript } from "../../../src/python/execute-app-dot-py.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

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
    console.log("generating", llms);

    // Call the Python script
    const { stdout, isDone } = await runPythonScript(
      prompts,
      groups,
      llms,
      continuations
    );

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

// GET /api/generate/check
generateRouter.get("/check", async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  try {
    const jsonFilePath = join(
      __dirname,
      "../../../src/data/llm_generated.json"
    );

    // Read and Check if the JSON content is empty
    const fileContent = await fs.readFile(jsonFilePath, "utf8");
    if (fileContent.trim().length === 0) {
      return res.json({ isEmpty: true });
    } else {
      return res.json({ isEmpty: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default generateRouter;
