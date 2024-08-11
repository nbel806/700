import React from "react";
import Link from "next/link";
import { Card, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Card>
        <Typography variant="h6">
          University of Auckland Part IV Project
        </Typography>
        <Typography variant="h6">Nathan Bell and Troy Murdoch</Typography>
        <Typography variant="h6">© 2023</Typography>
      </Card>
    </>
  );
};

export default Footer;
