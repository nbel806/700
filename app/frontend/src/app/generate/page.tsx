import { Box, Card, Typography } from "@mui/material";

import GenerateArea from "@/components/tool/generateArea";
import DemographicGroups from "@/components/generate/demographicGroups";
import LLMS from "@/components/generate/llms";

export default function Generate() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        height: "100vh",
        gap: 2,
      }}
      style={{ padding: "7vh 10vw" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: 2,
          border: "1px solid #f5f5f5",
        }}
      >
        <LLMS />
        {/* Right box */}
        <Card
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #f5f5f5",
          }}
        >
          <Typography variant="h6">Right Box</Typography>
        </Card>
      </Box>

      <DemographicGroups />
      {/* Third Box */}
      <Card
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          border: "1px solid #f5f5f5",
        }}
      >
        <Typography variant="h6">Third Box</Typography>
      </Card>

      <Card
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          border: "1px solid #f5f5f5",
        }}
      >
        <GenerateArea />
      </Card>
    </Box>
  );
}
