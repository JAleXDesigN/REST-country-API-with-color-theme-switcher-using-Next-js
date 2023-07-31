import { getCountries } from "@/api-calls";
import CountryList from "@/components/CountryList";
import SearchBar from "@/components/SearchBar";
import { CountriesProvider } from "@/context";

const Home = async () => {
  const countries = await getCountries();
  return (
    <CountriesProvider countries={countries}>
      <SearchBar />
      <CountryList />
    </CountriesProvider>
  );
};

export default Home;
