import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div>
        <div>
          <div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
