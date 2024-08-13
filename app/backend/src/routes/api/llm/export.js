import { Router } from "express";

const exportRouter = Router();

// GET /api/export
exportRouter.get("/export", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default exportRouter;
