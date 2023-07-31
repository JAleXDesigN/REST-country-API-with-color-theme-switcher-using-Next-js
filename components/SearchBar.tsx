"use client";

import { useCountries } from "@/context";

import { InputSearch, InputSelect } from "./inputs";
import styles from "./SearchBar.module.scss";

const options: Filter[] = [
  "Africa",
  "Americas",
  "Antarctic",
  "Asia",
  "Europe",
  "Oceania",
];

const SearchBar = () => {
  const { query, countries_name, filter, filterByRegion, setSearch } =
    useCountries();
  return (
    <div className={styles.root}>
      <InputSearch
        id="input-search"
        data={countries_name}
        value={query}
        onChange={(value) => setSearch(value, false)}
        onSearch={(value) => setSearch(value, true)}
      />

      <InputSelect
        id="filter-by-region"
        options={options}
        value={filter}
        placeholder="Filter by Region"
        onChange={filterByRegion}
        onClear={() => filterByRegion("")}
      />
    </div>
  );
};

export default SearchBar;
