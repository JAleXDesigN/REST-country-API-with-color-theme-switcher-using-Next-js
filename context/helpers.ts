export const filterCountries = (
  query: string,
  countries: Countries,
  filter: Filter,
  searching: boolean
) => {
  if (query.trim().length > 0 && searching) {
    return countries.filter((country) =>
      country.name.official.toLowerCase().includes(query.trim().toLowerCase())
    );
  }

  if (filter !== "") {
    return countries.filter((country) => country.region === filter);
  }

  return countries;
};
