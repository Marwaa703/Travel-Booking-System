// utils/mapUtils.ts

import { Location } from "@/types/trip";

// Adjust the import as necessary
export const OFFSET_DISTANCE = 0.5; // Adjust this value as needed

//  calculate the midpoint between two coordinates.
export const getMidpoint = (
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number },
) => {
  return {
    latitude: (coord1.latitude + coord2.latitude) / 2,
    longitude: (coord1.longitude + coord2.longitude) / 2,
  };
};
// Helper to calculate bearing (direction) between two points for arrow rotation
export const getBearing = (
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
) => {
  const startLatRad = (Math.PI * startLat) / 180;
  const startLngRad = (Math.PI * startLng) / 180;
  const endLatRad = (Math.PI * endLat) / 180;
  const endLngRad = (Math.PI * endLng) / 180;

  const dLng = endLngRad - startLngRad;
  const y = Math.sin(dLng) * Math.cos(endLatRad);
  const x =
    Math.cos(startLatRad) * Math.sin(endLatRad) -
    Math.sin(startLatRad) * Math.cos(endLatRad) * Math.cos(dLng);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
};

export const calculateInitialRegion = (locations: Location[]) => {
  const midLat =
    locations?.reduce((sum, loc) => sum + loc.lat, 0) / locations?.length;
  const midLon =
    locations?.reduce((sum, loc) => sum + loc.lon, 0) / locations?.length;
  return {
    latitude: midLat,
    longitude: midLon,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };
};

export const adjustLocations = (
  locations: Location[],
  offsetDistance: number,
): Location[] => {
  let adjusted = [...locations];

  for (let i = 0; i < adjusted.length; i++) {
    for (let j = 0; j < i; j++) {
      let distance = Math.sqrt(
        Math.pow(adjusted[i].lat - adjusted[j].lat, 2) +
          Math.pow(adjusted[i].lon - adjusted[j].lon, 2),
      );

      while (distance < offsetDistance) {
        const bearing = getBearing(
          adjusted[j].lat,
          adjusted[j].lon,
          adjusted[i].lat,
          adjusted[i].lon,
        );
        const bearingRad = (bearing * Math.PI) / 180;

        adjusted[i].lat += offsetDistance * Math.cos(bearingRad + Math.PI / 4);
        adjusted[i].lon += offsetDistance * Math.sin(bearingRad + Math.PI / 4);

        distance = Math.sqrt(
          Math.pow(adjusted[i].lat - adjusted[j].lat, 2) +
            Math.pow(adjusted[i].lon - adjusted[j].lon, 2),
        );
      }
    }
  }

  return adjusted;
};

export const getCoordinatesForPolyline = (locations: Location[]) => {
  return locations
    .sort((a, b) => a.location_order - b.location_order)
    .map((location) => ({
      latitude: location.lat,
      longitude: location.lon,
    }));
};
