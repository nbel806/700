import { Button, Card, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        sx={{ backgroundColor: "background.default" }}
      >
        <Typography variant="h1" color="primary" style={{ fontWeight: "bold" }}>
          Bias Detection Tool
        </Typography>
        <Typography color="primary" variant="h4">
          for the New Zealand Context
        </Typography>

        <Button
          variant="contained"
          href="/tool"
          style={{
            margin: 32,
            padding: 32,
          }}
        >
          <Typography variant="h3">Get started</Typography>
        </Button>
      </Container>
    </>
  );
}
