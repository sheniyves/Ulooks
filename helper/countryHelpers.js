import { countriesFetch, getStatesByCountry } from "./customerAuth";

export const getValidCountries = async () => {
  const data = await countriesFetch();
  return data.countries.map((q) => ({
    country_code1: q.alpha_2,
    country_code2: q.alpha_3,
    value: q.name.toLowerCase(),
    label: q.name,
  }));
};

export const getValidStates = async (country_code) => {
  const data = await getStatesByCountry(country_code);
  return data.subdivisions.map((q) => ({
    value: q.name.toLowerCase(),
    label: q.name,
    subdivisionCount: q.total_count,
  }));
};
