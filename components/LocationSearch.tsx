/* eslint-disable react-native/no-unused-styles */
import useLocationSearch, { LocationResult } from "@/hooks/useLocationSearch";
import React, { useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputField from "./forms/TextInputField";
import { useTheme } from "@/hooks/useTheme";

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface LocationSearchProps {
  onSelectLocation: (location: Location) => void;
  placeholder: string;
  setPlaceholder: (v: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onSelectLocation,
  placeholder,
  setPlaceholder,
}) => {
  // configure styles
  const theme = useTheme();
  const [query, setQuery] = useState<string>("");

  const { results, loading, error, searchLocations, setResults } =
    useLocationSearch();

  const handleSearch = (text: string) => {
    setQuery(text);
    searchLocations(text);
  };

  const handleSelect = (location: LocationResult) => {
    console.log({ location });
    const { lat, lon, display_name } = location;
    onSelectLocation({
      name: display_name,
      lat: Number(lat),
      lon: Number(lon),
    });
    setQuery("");
    setResults([]);
    setPlaceholder(display_name);
  };

  return (
    <View>
      <TextInputField
        trim={false}
        name={"search"}
        icon={"search"}
        onChangeText={handleSearch}
        value={query}
        placeholder={placeholder}
        onBlur={() => {}}
      />
      {loading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {results.length > 0 &&
        results.map((item) => (
          <TouchableOpacity
            key={item.place_id}
            style={{
              borderBottomColor: theme.accent,
              borderBottomWidth: 1,
              paddingVertical: 4,
            }}
            onPress={() => handleSelect(item)}
          >
            <Text>{item.display_name.slice(0, 50)}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default LocationSearch;
