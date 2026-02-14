import axiosInstance from "./axiosInstance";

export const createUserAccount = async (payload) => {
  console.log({payload})
  try {
    const response = await axiosInstance.post("auth/register", payload);
    return { success: true, data: response.data }; // return success response
  } catch (error) {
    // Extract meaningful error message
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    return { success: false, error: errorMessage }; // return error object
  }
};


export const loginUserAccount = async (payload) => {
  const response = await axiosInstance.post("auth/login", payload);
  return response.data;
};

export const confirmResetPassword = async (payload) => {
  const response = await axiosInstance.post(
    "auth/confirm-password-reset",
    payload
  );
  return response.data;
};

export const resetPasswordOtp = async (payload) => {
  const response = await axiosInstance.post(
    "auth/request-password-reset",
    payload
  );
  return response.data;
};

// Email and userId
export const resendVerification = async (payload) => {
  const response = await axiosInstance.post("verify/send-verification", null, {
    params: {
      user_id: payload.user_id,
      email: payload.email,
    },
  });
  return response.data;
};

// Code and userId
//Sending as query
export const verifyAccount = async (payload) => {
  console.log({ payload });
  const response = await axiosInstance.post("verify/verify", null, {
    params: {
      user_id: payload.user_id,
      code: payload.code,
    },
  });
  return response.data;
};

export const countriesFetch = async (payload) => {
  const response = await axiosInstance.get(
    "countries/",
    payload
  );
  return response.data;
};
export const getStatesByCountry = async (country_code) => {
  const response = await axiosInstance.get(
    `countries/${country_code}/subdivisions`,
  );
  return response.data;
};

//  const countriesFetch = async () => {
//   const response = await fetch("https://api.countrystatecity.in/v1/countries", {
//     headers: { "X-CSCAPI-KEY": "YOUR_API_KEY" }, //Fix in the API key
//   });
//   const countries = await response.json();
//   console.log({ countries });
// };




export const getCitiesByState = async (countryCode, stateCode) => {
  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
    {
      headers: { "X-CSCAPI-KEY": "YOUR_API_KEY" }, //Fix in the API key
    }
  );

  if (response.ok) {
    const cities = await response.json();
    console.log(
      `Found ${cities.length} cities in ${stateCode}, ${countryCode}`
    );
    return cities;
  } else {
    console.error("State not found or no cities available");
    return [];
  }
};
