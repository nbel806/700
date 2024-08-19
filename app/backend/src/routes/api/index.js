import { Router } from "express";

const router = Router();

import pythonRoutes from "./python-test.js";
router.use("/python", pythonRoutes);

import llmRoutes from "./llm/llm-routes.js";
router.use("/llm", llmRoutes);

// Export all data
import exportRouter from "./export.js";
llmRoutes.use("/export", exportRouter);

// Generate
import generateRouter from "./generate.js";
llmRoutes.use("/generate", generateRouter);

export default router;
