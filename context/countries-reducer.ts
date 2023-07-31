export const reducer: CountriesReducer = (prevState, action) => {
  const { type, payload } = action;

  if (type === "SET_SEARCH_VALUE") {
    const { query, search } = payload;
    return {
      ...prevState,
      filter: "",
      query,
      searching: search,
    };
  }

  if (type === "SET_FILTER_TYPE") {
    return {
      ...prevState,
      filter: payload,
      query: "",
      searching: false,
    };
  }

  return prevState;
};
