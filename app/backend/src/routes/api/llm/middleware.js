import fs from "fs";
import path from "path";

const defaultDataPath = path.resolve("src/data/llm.json");
const generatedDataPath = path.resolve("src/data/llm_generated.json");

// decides whether to use llm_generated.json or llm.json for data
export const dataSourceMiddleware = (req, res, next) => {
  const { selectedData } = req.query;
  try {
    if (selectedData === "generated_data") {
      req.dataSource = JSON.parse(fs.readFileSync(generatedDataPath, "utf-8"));
    } else if (selectedData === "default_data") {
      req.dataSource = JSON.parse(fs.readFileSync(defaultDataPath, "utf-8"));
    } else {
      console.error("Invalid data source selected:", selectedData);
    }
    next();
  } catch (error) {
    console.error("Error loading data source:", error);
    res.status(500).json({ error: "Failed to load data source." });
  }
};
