import { Router } from "express";
import { runPythonTestScript } from "../../../src/python/execute-python.js";

const router = Router();

// GET /api/python
router.get("/", async (req, res) => {
  try {
    const output = await runPythonTestScript("pythonTest.exe");
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
