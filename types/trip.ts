/* eslint-disable prettier/prettier */

export interface Trip {
  tripDetailes:{
    id?:string;
    date: string;
    status: string;
    name: string;
    description: string;
    price: number;
    rate:number;
    max_reservations: number;
    isFavorite?: boolean; // New field for favorite functionality
  },
  images: string[]; // Array of image URLs
  locations: {
    tripId: string;
    order: number;
    name: string;
    lat: string;
    lon: string;
  }[];
}
