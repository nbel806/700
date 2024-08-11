import React from "react";
import Link from "next/link";
import { Card } from "@mui/material";

const Navbar = () => {
  return (
    <Card>
      <ul>
        <li>
          <Link href="/">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link href="/tool">
            <p>Tool</p>
          </Link>
        </li>
      </ul>
    </Card>
  );
};

export default Navbar;
