"use client";

import { usePathname } from "next/navigation";
import type { FC, ReactNode } from "react";

import { mergeClassNames } from "@/helpers";

import styles from "./Main.module.scss";

interface MainProps {
  children: ReactNode;
}

const { root, home, details } = styles;

const Main: FC<MainProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <main
      className={mergeClassNames({
        [root]: true,
        [home]: pathname === "/",
        [details]: pathname !== "/",
      })}
    >
      {children}
    </main>
  );
};

export default Main;
