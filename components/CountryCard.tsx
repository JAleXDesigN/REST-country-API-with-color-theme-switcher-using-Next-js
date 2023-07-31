import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { useRipple } from "@/hooks";

import styles from "./CountryCard.module.scss";
import Ripple from "./Ripple";

const { root, image, info, title, data } = styles;

const CountryCard: FC<Country> = ({
  cca3,
  flags,
  name,
  capital,
  population,
  region,
}) => {
  const { ripples, listeners } = useRipple();
  return (
    <div
      className={root}
      {...listeners}
    >
      <div className={image}>
        <Image
          src={flags.svg}
          alt={flags.alt}
          width={640}
          height={326}
        />

        <Ripple ripples={ripples} />
      </div>
      <div className={info}>
        <Link
          className={title}
          href={`/country/${cca3.toLowerCase()}`}
        >
          {name.official}
        </Link>

        <div className={data}>
          <p>
            Population: <span>{population}</span>
          </p>
          <p>
            Region: <span>{region}</span>
          </p>
          <p>
            Capital: <span>{capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
