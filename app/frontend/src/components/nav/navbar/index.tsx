import React from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const Navbar = () => {
  const navItems = ["Home", "Tool", "Generate", "About"];

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "primary.main",
        height: "8vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between" }}
        style={{ width: "100vw" }}
      >
        <Box>
          <Link href="/home">
            <Typography variant="h6" style={{ marginLeft: 32 }}>
              University of Auckland
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Link href="/tool">
            <Typography variant="h6">Tool</Typography>
          </Link>
          <Link href="/generate">
            <Typography variant="h6">Generate</Typography>
          </Link>
          <Link href="/about" style={{ paddingRight: 32 }}>
            <Typography variant="h6">About</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
