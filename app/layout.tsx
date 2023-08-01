import "../styles/main.scss";

import { ServerThemeProvider, ThemeProvider } from "@wits/next-themes";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { getCountries } from "@/api-calls";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { CountriesProvider } from "@/context";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Where in the world?",
  description:
    'Solution to Frontend Mentor "REST country API with color theme switcher" challenge by Jonathan Holguin',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
   const countries = await getCountries();
  return (
    <ServerThemeProvider>
      <html lang="en">
        <body className={nunito_sans.className}>
           <CountriesProvider countries={countries}>
          <ThemeProvider>
            <Header />
            <Main>{children}</Main>
          </ThemeProvider></CountriesProvider>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
