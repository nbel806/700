import { Box } from "@mui/material";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/nav/navbar";
import Footer from "../components/nav/footer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import Head from "next/head";

export const metadata: Metadata = {
  title: "LLM Bias Comparison Tool",
  description: "Compare Bias within different LLMs for the New Zealand context",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100vh" }}>
      <body
        style={{
          height: "100vh",
          margin: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
