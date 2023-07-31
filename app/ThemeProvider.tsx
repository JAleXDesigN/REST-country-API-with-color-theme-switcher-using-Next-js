"use client";

import { ThemeProvider as NextThemeProvider } from "@wits/next-themes";
import type { FC, PropsWithChildren } from "react";

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <NextThemeProvider>{children}</NextThemeProvider>;
};

export default ThemeProvider;
