/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react"; 
import Button from "@/components/Buttons";
import {  useRouter } from "expo-router";
import { COLORS, FONTS } from "@/constants/theme";
import Rating from "@/components/Rating";
import CardSubtitle from "@/components/CardSubtitle";
import icons from "@/constants/icons";
import { trips } from "@/DummyData/trips.json";
import { useRoute } from "@react-navigation/native";
import Like from "@/components/Like";
import { places } from "@/constants/maps";

interface Trip {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  price: string;
  location: string;
  description: string;
  image: string;
}

const TripDetails: React.FC = () => {
  const route = useRoute();
  const [isExpanded, setIsExpanded] = useState(false);
  const { tripId } = route.params as { tripId: string };

  const tripIdNumber = Number(tripId);
  const trip = trips.find((t) => t.id === tripIdNumber) as Trip | undefined;

  const {
    image = "",
    title = "Default Trip Title",
    subtitle = "Default Company",
    rating = 0,
    price = "N/A",
    location = "Unknown",
    description = "Traveling is reported to have a positive impact on health. It can boost your immune system, improve your mood, and alleviate stress. Traveling is reported to have a positive impact on health. It can boost your immune system, improve your mood, and alleviate stress. Traveling is reported to have a positive impact on health. It can boost your immune system, improve your mood, and alleviate stress.",
  } = trip || {};
const router = useRouter();
 
const handleSeeOnMap =() => {
  router.push(`/tripMap?places=${encodeURIComponent(JSON.stringify(places))}`);
}
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.mapButtonContainer}>
            <Button
              title={"See on Map"}
              type="secondary"
              width={"30%"}
              align="center"
              onPress={handleSeeOnMap}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.tripTitle}>{title}</Text>
            <View style={styles.like}>
              <Like />
            </View>
          </View>
          <Text style={styles.companyName}>{subtitle}</Text>
          <View style={styles.detailRow}>
            <CardSubtitle
              text={location}
              icon={icons.location}
              iconColor={COLORS.textSecondary}
            />
            <Rating rate={rating} />
            <Text style={styles.price}>{price}/Person</Text>
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
                {description}
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
              width={"400%"}
              onPress={() => {
                router.push(`/payment?tripId=${tripId}`);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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