import useLocationSearch, { LocationResult } from "@/hooks/useLocationSearch";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputField from "./forms/TextInputField";
import { COLORS } from "@/constants/theme";

interface Location {
  name: string;
  lat: string;
  long: string;
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
  const [query, setQuery] = useState<string>("");

  const { results, loading, error, searchLocations, setResults } =
    useLocationSearch();

  const handleSearch = (text: string) => {
    setQuery(text);
    searchLocations(text);
  };

  const handleSelect = (location: LocationResult) => {
    console.log({ location });
    const { lat, long, display_name } = location;
    onSelectLocation({ name: display_name, lat, long });
    setQuery("");
    setResults([]);
    setPlaceholder(display_name);
  };

  return (
    <SafeAreaView>
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
      {
        results.length > 0 &&
          results.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              style={{
                borderBottomColor: COLORS.accent,
                borderBottomWidth: 1,
                paddingVertical: 4,
              }}
              onPress={() => handleSelect(item)}
            >
              <Text>{item.display_name.slice(0, 50)}</Text>
            </TouchableOpacity>
          ))
        // <FlatList
        //   data={results}
        //   keyExtractor={(item) => item.place_id}
        //   renderItem={({ item }) => (
        //     <TouchableOpacity
        //       style={{
        //         borderBottomColor: COLORS.accent,
        //         borderBottomWidth: 1,
        //         paddingVertical: 4,
        //       }}
        //       onPress={() => handleSelect(item)}
        //     >
        //       <Text>{item.display_name.slice(0, 50)}</Text>
        //     </TouchableOpacity>
        //   )}
        // />
      }
    </SafeAreaView>
  );
};

export default LocationSearch;
