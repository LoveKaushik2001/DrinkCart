import axios from "axios";

const apiKey = "5b3ce3597851110001cf6248d04c0e21aaa34efa8d6659f6e2923235";
export const calculateDistance = async (path1: any, path2: any) => {
  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        coordinates: [
          [path1.lng, path1.lat],
          [path2.lng, path2.lat],
        ],
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.routes[0].summary.distance / 1000; // Distance in kms
  } catch (error) {
    console.error("Error calculating distance:", error);
  }
};
