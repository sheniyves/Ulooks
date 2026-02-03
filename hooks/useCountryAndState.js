import { useQuery } from "@tanstack/react-query";
import { countriesFetch, getStatesByCountry } from "../src/api/customerAuth";

const useCountryAndState = (selectedCountry) => {
  const { data: countriesData, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: countriesFetch,
  });

  const validCountries = countriesData?.data.countries?.map((q) => ({
    country_code1: q.alpha_2,
    country_code2: q.alpha_3,
    value: q.name.toLowerCase(),
    label: q.name,
  }));


  // console.log("Countries data",countriesData )
  // console.log("Proof of selected country is available", selectedCountry)

  const getSelectedCountryCode = validCountries?.find(
    (q) => q.value === selectedCountry
  );

  // console.log('Getting the full data of country', getSelectedCountryCode)

  const { data: statesData, isPending: isStatePending } = useQuery({
    queryKey: [
      "states",
      getSelectedCountryCode?.country_code1 ||
        getSelectedCountryCode?.country_code2,
    ],
    queryFn: () =>
      getStatesByCountry(
        getSelectedCountryCode?.country_code1 ||
          getSelectedCountryCode?.country_code2
      ),
    enabled: !!getSelectedCountryCode, 
  });

  // console.log("The states data", statesData)

  const validStates = statesData?.data.subdivisions?.map((q) => ({
    value: q.name.toLowerCase(),
    label: q.name,
  }));

  // console.log('The states after clean build', validStates)

  const subdivisionCount = statesData?.data.total_count;

  return {
    validCountries,
    validStates,
    subdivisionCount,
    getSelectedCountryCode,
    isPending,
    isStatePending,
  };
};

export default useCountryAndState;
