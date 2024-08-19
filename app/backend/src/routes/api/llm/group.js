import { Router } from "express";
import {
  getDemographicGroups,
  getLLMDataGrouped,
  getLLMDataUngrouped,
} from "../../../data/data.js";
const groupRouter = Router();

// GET /api/llm/group/:llm/:grouped?
// What demographic groups exist for an LLM?
groupRouter.get("/:llm/:grouped?", async (req, res) => {
  const { llm, grouped } = req.params;

  // Convert 'grouped' parameter to a boolean
  const isGrouped =
    grouped !== undefined ? grouped.toLowerCase() === "true" : true;

  try {
    const groups = getDemographicGroups(llm, isGrouped);
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Failed to retrieve demographic groups for ${llm}.` });
  }
});

// GET /api/llm/group/data/:llm/:grouped?
// Data for an llm, grouped or ungrouped
groupRouter.get("/data/:llm/:grouped", async (req, res) => {
  const { llm } = req.params;
  const { grouped } = req.params;
  if (grouped === "true") {
    try {
      const groupedData = getLLMDataGrouped(llm);
      res.status(200).json(groupedData);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to retrieve grouped data for ${llm}.` });
    }
  } else if (grouped === "false") {
    try {
      const ungroupedData = getLLMDataUngrouped(llm);
      res.status(200).json(ungroupedData);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to retrieve ungrouped data for ${llm}.` });
    }
  }
});

export default groupRouter;
