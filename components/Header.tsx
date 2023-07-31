"use client";

import { useTheme } from "@wits/next-themes";
import Link from "next/link";

import Button from "./Button";
import styles from "./Header.module.scss";
import { IconMoon, IconSun } from "./icons";

const { root, wrapper, logo } = styles;

const Header = () => {
  const { setTheme } = useTheme();
  return (
    <header className={root}>
      <div className={wrapper}>
        <Link
          href="/"
          className={logo}
        >
          Where in the world?
        </Link>

        <Button
          variant="mode"
          icon={IconSun}
          label="Light mode"
          hiddeOnTheme="light"
          onClick={() => setTheme("light")}
        />
        <Button
          variant="mode"
          icon={IconMoon}
          label="Dark mode"
          hiddeOnTheme="dark"
          onClick={() => setTheme("dark")}
        />
      </div>
    </header>
  );
};

export default Header;
