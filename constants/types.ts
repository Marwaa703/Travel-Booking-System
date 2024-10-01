// types.ts
export interface TripDetails {
  name: string;
  details: string;
  price: number;
  max_reservations: number;
  // Add other trip details fields as needed
}

export interface Location {
  order: number;
  lat: number;
  lon: number;
  imageUrl: string;
  name: string;
}

export interface TripImage {
  imageUrl: string;
  caption: string;
}

export interface TripFormData {
  tripDetails: TripDetails;
  locations: Location[];
  images: TripImage[];
}
