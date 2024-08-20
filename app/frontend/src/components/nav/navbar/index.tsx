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
    <AppBar position="sticky" sx={{ bgcolor: "primary.main" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Link href="/home">
            <Typography variant="h5" style={{ marginLeft: 32 }}>
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
