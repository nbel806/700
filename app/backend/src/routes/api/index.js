import { Router } from "express";

const router = Router();

import pythonRoutes from "./python-test.js";
router.use("/python", pythonRoutes);

import llmRoutes from "./llm/llm-routes.js";
router.use("/llm", llmRoutes);

export default router;
