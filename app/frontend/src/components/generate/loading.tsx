import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Loading() {
  const words = ["Running LLM... ", "Generating text... ", "Analysing data..."];
  const [currentWord, setCurrentWord] = useState<string>(words[0]);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const changeWord = () => {
      setCurrentWord(words[currentIndex]);
      currentIndex = (currentIndex + 1) % words.length;

      const randomDelay = Math.floor(Math.random() * 2000) + 4000;
      timeoutId = setTimeout(changeWord, randomDelay);
    };

    changeWord();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Box sx={{ width: "40%" }} style={{ marginTop: 32 }}>
      <Typography
        variant="h5"
        color={"primary"}
        fontWeight={"bold"}
        style={{ marginBottom: 8 }}
      >
        {currentWord}
      </Typography>
      <LinearProgress color="secondary" />
    </Box>
  );
}
