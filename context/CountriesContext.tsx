"use client";
import { createContext, useContext, useMemo, useReducer, useRef } from "react";

import { reducer } from "./countries-reducer";
import { filterCountries } from "./helpers";

const Context = createContext<CountriesContext>({} as CountriesContext);

export const useCountries = () => useContext(Context);

const initializer = (countries: Countries): State => {
  return {
    countries,
    filter: "",
    query: "",
    searching: false,
  };
};

const CountriesProvider: ICountriesProvider = ({
  children,
  countries: _countries,
}) => {
  const [{ countries, query, filter, searching }, dispatch] = useReducer(
    reducer,
    _countries,
    initializer
  );

  const queryRef = useRef("");

  const filtered_countries = useMemo(
    () => filterCountries(queryRef.current, countries, filter, searching),
    [countries, filter, searching]
  );

  const countries_name = useMemo(
    () => countries.map((country) => country.name.official),
    [countries]
  );

  const setSearch = (query: string, search: boolean) => {
    queryRef.current = query;
    dispatch({ type: "SET_SEARCH_VALUE", payload: { query, search } });
  };

  const filterByRegion = (filter: Filter) => {
    dispatch({ type: "SET_FILTER_TYPE", payload: filter });
  };

  return (
    <Context.Provider
      value={{
        query,
        filter,
        searching,
        countries: filtered_countries,
        countries_name,
        setSearch,
        filterByRegion,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CountriesProvider;
