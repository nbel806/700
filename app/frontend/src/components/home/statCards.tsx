import { Card, CardContent, Container, Typography } from "@mui/material";

export default function StatCards() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        minWidth: "100vw",
        paddingTop: 32,
        paddingBottom: 32,
        height: "30%",
        justifyContent: "space-evenly",
      }}
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Card
        style={{
          width: "20vw",
          padding: 16,
        }}
        sx={{
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          borderRadius: 3,
          alignContent: "center",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            5 LLMs
          </Typography>
          <Typography style={{ marginTop: 16 }} variant="body1">
            Including GPT-2, Bert & more
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          width: "20vw",
          padding: 16,
        }}
        sx={{
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          borderRadius: 3,
          alignContent: "center",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            NZ Context
          </Typography>
          <Typography style={{ marginTop: 16 }} variant="body1">
            Tool built for the NZ context
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          width: "20vw",
          padding: 16,
        }}
        sx={{
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
          borderRadius: 3,
          alignContent: "center",
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            Generate
          </Typography>
          <Typography style={{ marginTop: 16 }} variant="body1">
            Data that is easily customised
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
