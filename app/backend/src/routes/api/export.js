import { Router } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const exportRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

exportRouter.get("/", async (req, res) => {
  try {
    console.log("called");
    const excelFilePath = join(__dirname, "../../data/tool_data.xlsx");

    res.download(excelFilePath, "tool_data.xlsx", (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        res.status(500).json({ error: "Error downloading the file" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default exportRouter;
