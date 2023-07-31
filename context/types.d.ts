type Filter = keyof typeof Region | "";

interface State {
  countries: Countries;
  filter: Filter;
  query: string;
  searching: boolean;
}

type Action =
  | {
      type: "SET_SEARCH_VALUE";
      payload: { query: string; search: boolean };
    }
  | { type: "SET_FILTER_TYPE"; payload: Filter };

type CountriesReducer = React.Reducer<State, Action>;

interface Provider {
  children: React.ReactNode;
  countries: Countries;
}

interface CountriesContext {
  query: string;
  filter: Filter;
  searching: boolean;
  countries: Countries;
  countries_name: string[];
  setSearch: (query: string, search: boolean) => void;
  filterByRegion: (filter: Filter) => void;
}

type ICountriesProvider = React.FC<Provider>;
