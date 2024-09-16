import { Router } from "express";

const router = Router();

import pythonRoutes from "./python-test.js";
router.use("/python", pythonRoutes);

import llmRoutes from "./llm/llm-routes.js";
router.use("/llm", llmRoutes);

// Export all data
import exportRouter from "./export.js";
router.use("/export", exportRouter);

// Generate
import generateRouter from "./generate.js";
router.use("/generate", generateRouter);

// numGenerations
import numGenerationsRouter from "./num-generations.js";
router.use("/num_generations", numGenerationsRouter);

export default router;
