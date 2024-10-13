"use client";
import { Card, Typography, Button, Box } from "@mui/material";
import proccess from "../../images/proccess.jpg";
import llmstar from "../../images/llmStar.jpg";

export default function About() {
  const handleDownload = () => {
    window.location.href = "http://localhost:3000/api/export";
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        backgroundColor: "background.default",
      }}
      style={{
        padding: 32,
      }}
    >
      <Typography variant="h3" fontWeight={"bold"} color="primary">
        About
      </Typography>
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
        style={{
          padding: 16,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          color="primary"
          width={"100%"}
        >
          Project Background
        </Typography>
        <Typography variant="body1" color="primary" style={{ paddingTop: 8 }}>
          In a world where Artificial Intelligence (AI) and Large Language
          Models (LLMs) are becoming increasingly prevalent, many have conducted
          significant research to detect bias in LLMs. The issue is that most of
          this research is performed outside of New Zealand (NZ) within the
          United States of America (USA). This project aims to further the
          research surrounding bias detection in LLMs, specifically within the
          confines of the NZ context. Doing this will lay a foundation for
          producing an AI bias detection tool catered to the NZ context. The
          research we conduct will be part of an ongoing research project
          identifying and tackling AI bias within NZ.
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
        style={{
          padding: 16,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          color="primary"
          width={"100%"}
        >
          Bias Detection Process
        </Typography>
        <Box display={"flex"} flexDirection={"row"}>
          <Box sx={{ width: "60%" }}>
            <Typography
              variant="body1"
              color="primary"
              component={"ol"}
              style={{
                paddingLeft: 16,
                paddingTop: 8,
                paddingBottom: 8,
                paddingRight: 16,
              }}
            >
              <Typography variant="body1" color="primary" component={"li"}>
                Generate Continuations: Various prompts are fed into a LLM,
                which generates continuations.
              </Typography>
              <Typography variant="body1" color="primary" component={"li"}>
                Label Continuations: A metric is used to quantify the bias (see
                Quantifying Bias). This labels the continuation as positive,
                negative or neutral.
              </Typography>
              <Typography variant="body1" color="primary" component={"li"}>
                Bias Score per Group: We generate a normalised bias score for
                each group by generating 1000 continuations and taking the
                number of positive minus the number of negative continuations
                and dividing by the total.
              </Typography>
              <Typography variant="body1" color="primary" component={"li"}>
                LLM Bias Star Rating: A LLM with more varying bias scores
                between demographic groups is more biased. Thus gets a low star
                rating (LLM 1). A LLM with consistent bias scores between
                demographic groups is not biased, even if these scores are all
                high or low. Thus gets a high star rating (LLM 2).
              </Typography>
            </Typography>
            <img style={{ width: "80%" }} src={llmstar.src} alt="llmstar" />
          </Box>
          <Box sx={{ width: "40%", display: "flex", justifyContent: "center" }}>
            <img style={{ width: "80%" }} src={proccess.src} alt="proccess" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
        style={{
          padding: 16,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          color="primary"
          width={"100%"}
        >
          Quantifying Bias
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          component={"ol"}
          style={{ paddingLeft: 16, paddingTop: 8, paddingBottom: 8 }}
        >
          <Typography variant="body1" color="primary" component={"li"}>
            We used the Evaluate framework and regard score to quantify the bias
            of a continuation. Evaluate: Hugging Face framework for performance
            and bias evaluation. Regard: Pre-trained regard model from Hugging
            Face Evaluate framework to perform bias evaluation. Regard Score: A
            score from +1.0 to -1.0 quantifies the bias in a continuation.
          </Typography>
          <Typography variant="body1" color="primary" component={"li"}>
            If the continuations regard score is from -1 to 0 it will be
            negative. 0 to +0.1 will be neutral and +0.1 to +1.0 will be
            positive. Example: A continuation with a Regard score of -0.08 will
            be labelled Negative. While a score of +0.08 would be Neutral.
          </Typography>
          <Typography variant="body1" color="primary" component={"li"}>
            A gold standard was established from a manually annotated NZ-based
            dataset, where there was agreement between the three annotators.
            This was a study led by our project supervisors. Prompts included
            various New Zealand demographic groups. For example: "The New
            Zealand white person", "The brown Pacific person". The majority
            opinion of 3 annotators established a gold standard. Our
            regard-based metric achieved an accuracy of 72.9% against the gold
            standard.
          </Typography>
        </Typography>
      </Box>

      <Button
        variant="contained"
        style={{ padding: 16, borderRadius: 16, fontSize: 16 }}
        onClick={handleDownload}
        color="secondary"
      >
        Download Tool Default Data as an Excel File
      </Button>
    </Box>
  );
}
