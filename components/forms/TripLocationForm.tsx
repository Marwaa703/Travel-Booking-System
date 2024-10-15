// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import LocationSearch from "../LocationSearch";
// import TextInputField from "./TextInputField";
// import { Location } from "@/types/trip";
// import Spacer from "../Spacer";
// import Button from "../Buttons";
// import TextNote from "./TextNote";
// import LocationPicker from "../maps/LocationPicker";

// interface TripLocationFormProps {
//   onNext: (locations: Location[]) => void;
// }

// const TripLocationForm: React.FC<TripLocationFormProps> = ({ onNext }) => {
//   const [placeholder, setPlaceholder] = useState(
//     "Search for a location or place",
//   );

//   const [locations, setLocations] = useState<Location[]>([]);
//   const [imageUrl, setImageUrl] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState<{
//     name: string;
//     lat: number;
//     lon: number;
//   } | null>({
//     name: "",
//     lat: 0,
//     lon: 0,
//   });

//   const handleAddLocation = () => {
//     if (imageUrl && selectedLocation) {
//       setLocations([
//         ...locations,
//         {
//           ...selectedLocation,
//           location_order: locations.length + 1,
//           image_url: imageUrl,
//         },
//       ]);
//       setImageUrl(""); // Clear the image URL input after adding
//       setSelectedLocation(null);
//       setPlaceholder("Search for places");
//     }
//   };

//   const handleSelectLocation = (location: {
//     name: string;
//     lat: number;
//     lon: number;
//   }) => {
//     setSelectedLocation(location);
//   };

//   const handleDeleteLocation = (index: number) => {
//     setLocations(locations.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     onNext(locations);
//   };

//   return (
//     <View>
//       <View style={styles.locationRow}>
//         <View style={styles.row}>
//           <View style={{ width: "70%" }}>
//             <LocationSearch
//               placeholder={placeholder}
//               setPlaceholder={setPlaceholder}
//               onSelectLocation={(location) => handleSelectLocation(location)}
//             />
//           </View>
//           <View
//             style={{
//               width: "15%",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Text>or</Text>
//           </View>
//           <LocationPicker
//             onLocationSelect={(lat, lon) =>
//               setSelectedLocation((pre) => ({ ...pre, lat, lon }))
//             }
//           />
//         </View>
//         <Spacer height={14} />
//         <Spacer height={4} />
//         <View style={styles.row}>
//           <TextInputField
//             trim={false}
//             name={"location name"}
//             onChangeText={(text) =>
//               setSelectedLocation((pre) => ({ ...pre, name: text }))
//             }
//             icon="text"
//             onBlur={undefined}
//             value={imageUrl}
//           />
//         </View>
//         <TextNote
//           note="Location name will be visiable on trip map!"
//           style={{ alignSelf: "flex-start" }}
//         />
//         <Spacer />
//         <TextInputField
//           trim={false}
//           name={"location Image link"}
//           onChangeText={(text) => setImageUrl(text)}
//           icon="image-outline"
//           onBlur={undefined}
//           value={imageUrl}
//         />
//         <TextNote
//           style={{ alignSelf: "flex-start" }}
//           note="Support Image links ending with .jpg, .jpeg, or .png!"
//         />

//         <Spacer />

//         <Spacer />
//         <TouchableOpacity onPress={handleAddLocation} style={styles.addButton}>
//           <Text>+</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.addedLocationsContainer}>
//         {locations.length === 0 && (
//           <Text>Add locations to be displayed here</Text>
//         )}
//         {locations.map((loc, index) => (
//           <View key={index} style={styles.addedLocationRow}>
//             {loc.image_url ? (
//               <Image
//                 source={{ uri: loc.image_url }}
//                 style={styles.locationImage}
//                 onError={() =>
//                   setLocations(
//                     locations.map((l, i) =>
//                       i === index ? { ...l, imageUrl: "" } : l,
//                     ),
//                   )
//                 }
//               />
//             ) : null}
//             <Text style={styles.locationName}>{loc.name.substring(0, 30)}</Text>
//             <TouchableOpacity onPress={() => handleDeleteLocation(index)}>
//               <Text style={styles.deleteButton}>🗑️</Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>
//       <Button title="Next" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   locationRow: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     columnGap: 4,
//     width: "100%",
//   },
//   addButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#e0e0e0",
//   },
//   addedLocationsContainer: {
//     marginTop: 16,
//     marginBottom: 16,
//   },
//   addedLocationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingBottom: 8,
//   },
//   locationImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//     marginRight: 8,
//   },
//   locationName: {
//     flex: 1,
//     marginLeft: 8,
//     maxWidth: 100,
//   },
//   deleteButton: {
//     marginLeft: 8,
//   },
// });
// export default TripLocationForm;
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import LocationSearch from "../LocationSearch";
import TextInputField from "./TextInputField";
import { Location } from "@/types/trip";
import Spacer from "../Spacer";
import Button from "../Buttons";
import TextNote from "./TextNote";
import LocationPicker from "../maps/LocationPicker";
import Toast from "react-native-toast-message";
import { imageUrlPattern } from "@/constants/regext";

interface TripLocationFormProps {
  onNext: (locations: Location[]) => void;
}

const TripLocationForm: React.FC<TripLocationFormProps> = ({ onNext }) => {
  // const [toastData, setToastData] = useState<ToastShowParams | null>(null); // State for toast messages

  const [placeholder, setPlaceholder] = useState(
    "Search for a location or place",
  );
  const [locations, setLocations] = useState<Location[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    lat: number | null;
    lon: number | null;
  }>({
    name: "",
    lat: null,
    lon: null,
  });

  const handleAddLocation = () => {
    if (
      imageUrl &&
      selectedLocation.lat !== null &&
      selectedLocation.lon !== null
    ) {
      if (imageUrlPattern.test(imageUrl)) {
        setLocations([
          ...locations,
          {
            lat: selectedLocation.lat as unknown as number,
            lon: selectedLocation.lon as unknown as number,
            name: selectedLocation.name as string,
            location_order: locations.length + 1,
            image_url: imageUrl,
          },
        ]);
        setImageUrl(""); // Clear the image URL input after adding
        setSelectedLocation({ name: "", lat: null, lon: null }); // Reset selected location
        setPlaceholder("Search for places");
      } else {
        Toast.show({
          text1: "Invalid Image URL",
          text2: "Image URL must end with .jpg, .jpeg, or .png",
          type: "error",
        });
      }
    } else {
      Toast.show({
        text1: "Empty Fields",
        text2: "Can't add empty values",
        type: "error",
      });
    }
  };

  const handleSelectLocation = (location: {
    name: string;
    lat: number;
    lon: number;
  }) => {
    setSelectedLocation((prev) => ({
      ...prev,
      name: location.name.slice(0, 20),
      lat: location.lat,
      lon: location.lon,
    }));
  };

  const handleDeleteLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (locations.length >= 1) {
      onNext(locations);
    } else
      Toast.show({
        text1: "Trip Locations are required?",
        text2: "add one or more locations for the trip!",
        type: "error",
      });
  };
  console.log({ locations });
  return (
    <View>
      <View style={styles.locationRow}>
        <View style={styles.row}>
          <View style={{ width: "70%" }}>
            <LocationSearch
              placeholder={placeholder}
              setPlaceholder={setPlaceholder}
              onSelectLocation={handleSelectLocation}
            />
          </View>
          <View
            style={{
              width: "15%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>or</Text>
          </View>
          <LocationPicker
            onLocationSelect={(lat, lon) =>
              setSelectedLocation((prev) => ({ ...prev, lat, lon }))
            }
          />
        </View>
        <Spacer height={14} />
        <Spacer height={4} />
        <View style={styles.row}>
          <TextInputField
            trim={false}
            name={"location name"}
            onChangeText={(text) =>
              setSelectedLocation((prev) => ({ ...prev, name: text }))
            }
            icon="text"
            value={selectedLocation.name}
            onBlur={undefined}
          />
        </View>
        <TextNote
          note="Location name will be visible on trip map!"
          style={{ alignSelf: "flex-start" }}
        />
        <Spacer />
        <TextInputField
          trim={false}
          name={"location Image link"}
          onChangeText={(text) => setImageUrl(text)}
          icon="image-outline"
          value={imageUrl}
          onBlur={undefined}
        />
        <TextNote
          style={{ alignSelf: "flex-start" }}
          note="Support Image links ending with .jpg, .jpeg, or .png!"
        />
        <Spacer />
        <TouchableOpacity onPress={handleAddLocation} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <Toast position="top" />
      <View style={styles.addedLocationsContainer}>
        {locations.length === 0 && (
          <Text>Add locations to be displayed here</Text>
        )}
        {locations.map((loc, index) => (
          <View key={index} style={styles.addedLocationRow}>
            {loc.image_url ? (
              <Image
                source={{ uri: loc.image_url }}
                style={styles.locationImage}
                onError={() =>
                  setLocations(
                    locations.map((l, i) =>
                      i === index ? { ...l, image_url: "" } : l,
                    ),
                  )
                }
              />
            ) : null}
            <Text style={styles.locationName}>{loc.name.substring(0, 30)}</Text>
            <TouchableOpacity onPress={() => handleDeleteLocation(index)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  locationRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 4,
    width: "100%",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  addedLocationsContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  addedLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  locationImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 8,
  },
  locationName: {
    flex: 1,
    marginLeft: 8,
    maxWidth: 100,
  },
  deleteButton: {
    marginLeft: 8,
  },
});

export default TripLocationForm;
