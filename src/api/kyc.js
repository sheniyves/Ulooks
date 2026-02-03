import axios from "axios";

export const submitKycAndContact = async ({ kycData, ecData }) => {
  const token = localStorage.getItem("customerToken");

  // First: upload KYC
  await axios.post(
    "https://ulooks-api.vercel.app/api/v1/kyc/profile",
    kycData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // Then: emergency contact
  const ecResponse = await axios.post(
    "https://ulooks-api.vercel.app/api/v1/kyc/emergency-contact",
    ecData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return ecResponse.data;
};
