"use client";
import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1F4E79",
    },
    secondary: {
      main: "#3498DB",
    },
    error: {
      main: "#E74C3C",
    },
    success: {
      main: "#2ECC71",
    },
    background: {
      paper: "#ECF0F1",
    },
    divider: "#7F8C8D",
  },
});

export default theme;
