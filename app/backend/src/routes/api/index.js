import { Router } from "express";

const router = Router();

import pythonRoutes from "./python-test.js";
router.use("/python", pythonRoutes);

export default router;
