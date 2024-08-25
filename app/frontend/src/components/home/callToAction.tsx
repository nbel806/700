import { Container, Typography, Button } from "@mui/material";

export default function CallToAction() {
  return (
    <Container
      style={{
        minHeight: "80vh",
        minWidth: "100vw",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      sx={{ backgroundColor: "background.paper" }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        Bias Detection Tool
      </Typography>
      <Typography color="primary" variant="h4">
        for the New Zealand Context
      </Typography>

      <Button
        variant="contained"
        href="/tool"
        style={{
          marginTop: 48,
          padding: 32,
          borderRadius: 32,
        }}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          Get started
        </Typography>
      </Button>
    </Container>
  );
}
