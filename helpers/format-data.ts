export const getCurrenciesNames = (obj: Record<string, Currency>) => {
  const currencyNames = Object.values(obj).map((currency) => currency.name);
  return currencyNames.join(", ");
};

export const getLanguageNames = (obj: Record<string, string>) => {
  const languageNames = Object.values(obj);
  return languageNames.join(", ");
};
