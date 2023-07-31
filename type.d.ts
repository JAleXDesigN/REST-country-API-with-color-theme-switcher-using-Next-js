interface Country {
  flags: Flags;
  name: Name;
  capital: string[];
  region: keyof typeof Region;
  population: number;
  cca3: string;
}

type Countries = Country[];

interface CountryInfo extends Omit<Country, "cca3"> {
  tld: string[];
  currencies: Record<string, Currency>;
  subregion: string;
  languages: Record<string, string>;
  borders: string[];
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Name {
  common: string;
  official: string;
  nativeName: Record<string, NativeName>;
}

interface NativeName {
  official: string;
  common: string;
}

interface Currency {
  name: string;
  symbol: string;
}

enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}
