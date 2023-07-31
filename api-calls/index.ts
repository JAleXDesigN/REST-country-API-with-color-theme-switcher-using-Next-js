export const getCountries = async (): Promise<Country[]> => {
  const res = await fetch(
    `https://restcountries.com/v3.1/all?fields=cca3,flags,name,population,region,capital`
  );

  if (!res.ok) throw new Error("Falled to fetching countries");

  return res.json();
};

export const getCountry = async (cca3: string): Promise<CountryInfo> => {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${cca3}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders`
  );

  return res.json();
};
