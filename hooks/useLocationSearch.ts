import { useState } from "react";
import axios from "axios";
import { qlocationApiKey } from "@/constants/api";

export interface LocationResult {
  place_id: string;
  display_name: string;
  lat: string; // LocationIQ returns lat as a string
  long: string; // LocationIQ returns long as a string
}

const useLocationSearch = () => {
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocations = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<LocationResult[]>(
        `https://us1.locationiq.com/v1/search.php?key=${qlocationApiKey}&q=${encodeURIComponent(query)}&format=json`,
      );
      setResults(response.data);
    } catch (err) {
      setError("Error fetching locations");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchLocations, setResults };
};

export default useLocationSearch;
