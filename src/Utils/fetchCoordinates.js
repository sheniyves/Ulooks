import axios from "axios";

export const fetchCoordinates = async (location) => {
  try {
    const response = await axios.get(
      "https://us1.locationiq.com/v1/search.php",
      {
        params: {
          key: import.meta.env.VITE_LOCATIONIQ_API_KEY,
          q: location,
          format: "json",
        },
      }
    );

    const results = response.data;
    if (results.length > 0) {
      const { lat, lon } = results[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      console.error(" Location not found.");
    }
  } catch (err) {
    console.error(" Geocoding error:", err);
  }
}
