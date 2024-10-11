import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Buttons";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "@/constants/theme";
import Rating from "@/components/Rating";
import CardSubtitle from "@/components/CardSubtitle";
import icons from "@/constants/icons";
import { useRoute } from "@react-navigation/native";
import Like from "@/components/Like";
import { useAppSelector } from "@/redux/store";
import { getLocationsByTripId } from "@/api/tripLocations";
import { Location } from "@/types/trip";
import { selectTripById } from "@/redux/slices/tripsSlice";
import { Ionicons } from "@expo/vector-icons";
interface Trip {
  id: number;
  name: string;
  subtitle: string;
  rate: number;
  price: string;
  location: string;
  description: string;
  image_url: string;
}
// upgrade: by swaping
const TripDetails: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [locations, setLocations] = useState<Location[] | null>(null);

  const route = useRoute();
  const { id } = route.params as { id: string };

  console.log({ id });

  const trip = useAppSelector((state) => selectTripById(state.trips, id));

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const locations = await getLocationsByTripId(id);
      setLocations(locations);
    })();
  }, [id]);

  const handleSeeOnMap = () => {
    // will be handled
    router.push(
      `/tripMap?places=${encodeURIComponent(JSON.stringify(locations))}`,
    );
  };

  const images = trip?.images;

  // console.log({ id, locations });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <View style={styles.arrows}>
            <View style={styles.arrowsContainer}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color="white"
                onPress={() =>
                  setIndex(index === 0 ? images?.length - 1 : index - 1)
                }
              />
            </View>
            <View style={styles.arrowsContainer}>
              <Ionicons
                name="arrow-forward-outline"
                size={24}
                color="white"
                onPress={() =>
                  setIndex(index === images?.length - 1 ? 0 : index + 1)
                }
              />
            </View>
          </View>

          <Image
            source={{ uri: images[index]?.image_url }}
            style={styles.image}
          />
          <Text style={styles.caption}>{images[index]?.caption}</Text>
          <View style={styles.mapButtonContainer}>
            <Button
              title={"See on Map"}
              type="secondary"
              width={"40%"}
              align="center"
              onPress={handleSeeOnMap}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.tripTitle}>{trip?.name}</Text>
            <View style={styles.like}>
              <Like />
            </View>
          </View>
          <Text style={styles.companyName}>{trip?.company_id}</Text>
          <View style={styles.detailRow}>
            {/* update todo */}
            <CardSubtitle
              text={locations[0]?.name || "locationNames"}
              icon={icons.location}
              iconColor={COLORS.textSecondary}
            />
            <Rating rate={trip?.rate as number} />
            <Text style={styles.price}>{trip?.price}/Person</Text>
          </View>
          <Text style={styles.sectionTitle}>About Trip</Text>
          {/* Description container */}
          <View style={styles.descriptionContainer}>
            <ScrollView
              style={styles.scrollableDescription}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Text
                style={[
                  styles.tripDescription,
                  !isExpanded && styles.descriptionTruncated,
                ]}
                numberOfLines={isExpanded ? undefined : 3}
              >
                {trip?.description}
              </Text>
              {!isExpanded && (
                <TouchableOpacity onPress={() => setIsExpanded(true)}>
                  <Text style={styles.readMore}>Read More</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={"Book Now"}
              align="center"
              width={"120%"}
              onPress={() => {
                router.push(`/payment?tripId=${id}`);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  arrows: {
    position: "absolute",
    zIndex: 25,
    top: "45%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowsContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  imageContainer: {
    position: "relative",
  },
  caption: {
    fontSize: FONTS.xxlarge,
    zIndex: 20,
    position: "absolute",
    top: 26,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",

    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1.5,
  },
  image: {
    width: "100%",
    height: 450,
    resizeMode: "cover",
  },
  mapButtonContainer: {
    position: "absolute",
    bottom: "17.5%",
    right: "14%",
    width: "75%",
  },
  like: {
    backgroundColor: COLORS.textSubtitle,
    borderRadius: 50,
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 30,
    paddingVertical: 40,
    marginTop: -80,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tripTitle: {
    fontSize: FONTS.large,
    fontWeight: "bold",
    color: "#000",
  },
  companyName: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  price: {
    fontSize: 16,
    color: COLORS.accent,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: FONTS.medium,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionContainer: {
    maxHeight: 120,
  },
  scrollableDescription: {
    maxHeight: 110,
  },
  tripDescription: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  descriptionTruncated: {
    overflow: "hidden",
  },
  readMore: {
    color: COLORS.primary,
    marginTop: 5,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: "auto",
  },
});

export default TripDetails;
