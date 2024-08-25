import { Card, CardContent, Container, Typography } from "@mui/material";

export default function StatCards() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        minWidth: "100vw",
        padding: 48,
        justifyContent: "space-evenly",
      }}
      sx={{
        backgroundColor: "background.default",
        borderTopColor: "divider",
      }}
    >
      <Card
        style={{
          padding: 32,
          width: "20vw",
        }}
        variant="outlined"
        sx={{ backgroundColor: "background.paper" }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            5 LLMs
          </Typography>
          <Typography style={{ marginTop: 16 }} variant="h6">
            Including GPT-2, Bert & more
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{ padding: 32, width: "20vw" }}
        sx={{ backgroundColor: "background.paper" }}
        variant="outlined"
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            NZ Context
          </Typography>
          <Typography style={{ marginTop: 16 }} variant="h6">
            For NZ backed by research
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{ padding: 32, width: "20vw" }}
        variant="outlined"
        sx={{ backgroundColor: "background.paper" }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            Generate
          </Typography>
          <Typography style={{ marginTop: 16 }} variant="h6">
            Data that is easily customised
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
