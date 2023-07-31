import type { Metadata } from "next";
import type { FC } from "react";

import { getCountry } from "@/api-calls";
import CountryInfo from "@/components/CountryInfo";

interface CountryProps {
  params: { cca3: string };
}

export async function generateMetadata({
  params,
}: CountryProps): Promise<Metadata> {
  const country = await getCountry(params.cca3);

  return {
    title: `${country.name.official}`,
    icons: { icon: country.flags.png },
  };
}

const Country: FC<CountryProps> = async ({ params }) => {
  const sountry = await getCountry(params.cca3);
  return <CountryInfo {...sountry} />;
};

export default Country;
