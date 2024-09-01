import CallToAction from "@/components/home/callToAction";
import StatCards from "@/components/home/statCards";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ height: "87vh" }}>
      <CallToAction />
      <StatCards />
    </Box>
  );
}
