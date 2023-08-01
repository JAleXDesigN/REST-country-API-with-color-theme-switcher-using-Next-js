"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, Fragment, useMemo } from "react";

import { useCountries } from "@/context";
import { getCurrenciesNames, getLanguageNames } from "@/helpers";

import Button from "./Button";
import styles from "./CountryInfo.module.scss";
import { IconArrow } from "./icons";

const { root, image, info, data, border_countries } = styles;

const CountryInfo: FC<CountryInfo> = (countryInfo) => {
  const router = useRouter();
  const {borders: borders_list} = useCountries()
  const country = useMemo(() => {
    const {
      flags,
      name,
      tld,
      capital,
      region,
      subregion,
      currencies,
      languages,
      population,
      borders
    } = countryInfo;
    return {
      name: name.official,
      flag: { src: flags.svg, alt: flags.alt },
      data: [
        { label: "Native name", value: name.common, area: "a_name" },
        {
          label: "Population",
          value: population.toLocaleString(),
          area: "a_population",
        },
        { label: "Region", value: region, area: "a_region" },
        { label: "Sub region", value: subregion, area: "a_subregion" },
        { label: "Capital", value: capital.join(", "), area: "a_capital" },
        { label: "Top level domain", value: tld.join(", "), area: "a_tld" },
        {
          label: "Currencies",
          value: getCurrenciesNames(currencies),
          area: "a_currencies",
        },
        {
          label: "Languages",
          value: getLanguageNames(languages),
          area: "a_languages",
        },
      ],
      borders: borders.map(border => ({cca3: border, name: borders_list[border]}))
    };
  }, [countryInfo, borders_list]);

  return (
    <>
      <Button
        icon={IconArrow}
        label="Back"
        variant="back"
        onClick={() => router.back()}
      />

      <section className={root}>
        <div className={image}>
          <Image
            src={country.flag.src}
            alt={country.flag.alt}
            width={640}
            height={326}
            priority
          />
        </div>

        <div className={info}>
          <h1>{country.name}</h1>

          <div className={data}>
            {country.data.map(({ label, value, area }) => (
              <Fragment key={area}>
                {value && (
                  <span className={styles[area]}>
                    {label}: <span>{value}</span>
                  </span>
                )}
              </Fragment>
            ))}
          </div>

          {country.borders.length > 0 && (
            <div className={border_countries}>
              <span>Border Countries:</span>
              {country.borders.map(({cca3, name}) => (
                <Button
                  variant="border"
                  label={name}
                  component={Link}
                  key={cca3}
                  href={`/country/${cca3.toLowerCase()}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CountryInfo;
