"use client";

import { useTheme } from "@wits/next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "./Button";
import styles from "./Header.module.scss";
import { IconMoon, IconSun } from "./icons";

const { root, wrapper, title, logo } = styles;

const Header = () => {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  return (
    <header className={root}>
      <div className={wrapper}>
        {pathname === "/" ? (
          <h1 className={title}>Where in the world?</h1>
        ) : (
          <Link
            href="/"
            className={logo}
          >
            Where in the world?
          </Link>
        )}

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
