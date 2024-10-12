export interface TripDetailes {
  name: string;
  description: string;
  price: number;
  max_reservations: number;
  id?: string;
  date: Date;
  status?: TripStatus;
  rate?: number | null;
  isFavorite?: boolean;
  company_id?: string;
  // trip_id: string;
  // New
  // Add other trip details fields as needed
}

export interface Location {
  trip_id?: string;
  location_order: number;
  lat: number;
  lon: number;
  image_url: string;
  name: string;
}

export interface TripImage {
  image_id?: string;
  image_url: string;
  caption: string;
  trip_id?: string;
}

export interface TripInstruction {
  // instruction_id: string;
  display_time: string;
  instruction: string;
  trip_id: string;
}

export interface Trip extends TripDetailes {
  images: TripImage[]; // Array of image URLs
  locations?: Location[];
}
export interface TripFormData {
  images: TripImage[]; // Array of image URLs
  locations: Location[];
  details: TripDetailes;
}

export type TripStatus = "paused" | "active" | "completed" | "canceled";
