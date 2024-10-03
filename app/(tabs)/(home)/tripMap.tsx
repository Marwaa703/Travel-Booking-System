import React, { useEffect, useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomMarker from "@/components/maps/CustomMarker";
import { Location } from "@/constants/types";
import {
  calculateInitialRegion,
  adjustLocations,
  getCoordinatesForPolyline,
  getBearing,
  OFFSET_DISTANCE,
} from "@/utils/maps";
import { useRouter } from "expo-router";
import { places } from "@/constants/maps";

const Map: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  // const router = useRouter();
  // const { places } = router.query;

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // const locations = places ? JSON.parse(decodeURIComponent(places)) : [];

  const locations = places;
  const initialRegion = useMemo(
    () => calculateInitialRegion(locations),
    [locations],
  );
  const adjustedLocations = useMemo(
    () => adjustLocations(locations, OFFSET_DISTANCE),
    [locations],
  );
  const coordinates = useMemo(
    () => getCoordinatesForPolyline(adjustedLocations),
    [adjustedLocations],
  );

  useEffect(() => {
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
      animated: true,
    });
  }, [coordinates]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={initialRegion}>
        {adjustedLocations.map((location) => (
          <CustomMarker location={location} key={location.order} />
        ))}
        <Polyline
          coordinates={coordinates}
          strokeColor="dodgerblue"
          strokeWidth={2}
        />
        {adjustedLocations.map((loc, index) => {
          if (index < adjustedLocations.length - 1) {
            const nextLocation = adjustedLocations[index + 1];
            const midpoint = {
              latitude: (loc.lat + nextLocation.lat) / 2,
              longitude: (loc.lon + nextLocation.lon) / 2,
            };
            const bearing = getBearing(
              loc.lat,
              loc.lon,
              nextLocation.lat,
              nextLocation.lon,
            );

            return (
              <Marker
                key={`arrow-${index}`}
                coordinate={midpoint}
                anchor={{ x: 0.5, y: 0.5 }}
                rotation={bearing}
                flat
              >
                <Ionicons
                  name="navigate-circle-sharp"
                  size={24}
                  color="black"
                  style={{
                    width: 30,
                    height: 30,
                    transform: [{ rotate: `${bearing}deg` }],
                  }}
                />
              </Marker>
            );
          }
          return null;
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;