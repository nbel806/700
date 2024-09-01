import { Typography, Button, Box } from "@mui/material";

export default function CallToAction() {
  return (
    <Box
      style={{
        height: "70%",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      sx={{ backgroundColor: "background.paper" }}
    >
      <Typography variant="h2" color="black" fontWeight="bold">
        LLM Bias Detection Tool
      </Typography>
      <Typography color="black" variant="h5">
        for the New Zealand Context
      </Typography>

      <Button
        variant="contained"
        href="/tool"
        style={{
          marginTop: 48,
          padding: 32,
          borderRadius: 20,
        }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Get started
        </Typography>
      </Button>
    </Box>
  );
}
