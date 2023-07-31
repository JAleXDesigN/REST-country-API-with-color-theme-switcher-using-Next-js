"use client";

import { useCountries } from "@/context";
import usePagination from "@/hooks/use-pagination";

import CountryCard from "./CountryCard";
import styles from "./CountryList.module.scss";
import Pagination from "./Pagination";

const CountryList = () => {
  const { countries } = useCountries();
  const { items, range, active, setPage, previous, next } = usePagination({
    items: countries,
    itemsPerPage: 32,
  });

  return (
    <>
      <section className={styles.root}>
        {items.map((country) => (
          <CountryCard
            key={country.cca3}
            {...country}
          />
        ))}
      </section>

      <Pagination
        range={range}
        active={active}
        onChange={setPage}
        goPrevious={previous}
        goNext={next}
      />
    </>
  );
};

export default CountryList;
