import { Router } from "express";
import { getNumberGenerations } from "../../data/data.js";
const numGenerationsRouter = Router();

import { dataSourceMiddleware } from "./middleware.js";

numGenerationsRouter.use(dataSourceMiddleware);

// GET /api/num_generations
// num_generations for a dataset
numGenerationsRouter.get("/", async (req, res) => {
  try {
    const num_generations = getNumberGenerations(req.dataSource);
    res.status(200).json({ num_generations });
  } catch (error) {
    if (error.message === "No LLMs found in the data.") {
      res
        .status(200)
        .json({ num_generations: 0, message: "No LLMs found in the data." });
    } else {
      res.status(500).json({
        error: `Failed to retrieve the number of generations for ${req.query.selectedData}.`,
      });
    }
  }
});

export default numGenerationsRouter;
