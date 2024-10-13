import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Button from "@/components/Buttons";
import { COLORS } from "@/constants/theme";
import { fetchTripDetails, makePayment, bookTrip } from "@/api/payment";
import { useAppSelector } from "@/redux/store";
import { User } from "@/types/user";
import CustomAlert from "@/components/core/Alert";
import ScreenWraper from "@/components/containers/ScreenWraper";
import FormatDate from "@/components/core/FormatDate";
import { selectTripById } from "@/redux/slices/tripsSlice";
// const defaultImage = require("../../../assets/imgDefault.png");

//!Need to Handle the logic better
const Payment: React.FC = () => {
  const route = useRoute();
  const { tripId } = route.params as { tripId: string };
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tripDetails, setTripDetails] = useState<any>(null);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const user = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as User;

  const userId = user.id?.toString();
  const trip = useAppSelector((state) => selectTripById(state.trips, tripId));
  const image = trip?.images[0].image_url;

  useEffect(() => {
    const loadTripDetails = async () => {
      try {
        const data = await fetchTripDetails(tripId);
        setTripDetails(data);
      } catch (error: any) {
        setAlert({
          message: error.message || "Could not fetch trip details",
          type: "error",
        });
      }
    };
    loadTripDetails();
  }, [tripId]);

  const handlePayment = async () => {
    if (!userWalletAddress) {
      setAlert({ message: "Please enter your wallet address", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const paymentResponse = await makePayment(
        tripDetails.company_id,
        tripId,
        userWalletAddress,
        tripDetails?.price,
      );
      const { transactionHash } = paymentResponse;

      setAlert({
        message: `Payment Successful! Transaction hash: ${transactionHash}`,
        type: "success",
      });

      const bookingResponse = await bookTrip(tripId, userId, transactionHash);
      if (bookingResponse) {
        setAlert({
          message: "Your trip has been successfully booked!",
          type: "success",
        });
      } else {
        setAlert({
          message: "Could not book the trip. Please try again.",
          type: "error",
        });
      }
    } catch (error: any) {
      setAlert({
        message: error.message || "Something went wrong during payment.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!tripDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff5b00" />
        <Text>Loading Trip Details...</Text>
      </View>
    );
  }

  return (
    // <ScreenWraper>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/eth_logo.png")}
          style={styles.ethLogo}
        />
      </View>
      {alert && <CustomAlert message={alert.message} type={alert.type} />}
      <View style={styles.section}>
        <View style={styles.infoSection}>
          <View style={styles.tripDetailsColumn}>
            <Text style={styles.tripText}>Title: {tripDetails.name}</Text>
            <Text style={styles.tripText}>
              Date: {<FormatDate dateString={tripDetails.date} />}
            </Text>

            {/* <Text style={styles.tripText}>Rating: {4}</Text> */}
            {/* <Text style={styles.tripText}>
              People Joined: {tripDetails.max_reservations}
              </Text> */}
            <Text style={styles.tripText}>Price: {tripDetails.price} Wei</Text>
          </View>

          <View style={styles.imageColumn}>
            <Image source={{ uri: image }} style={styles.tripImage} />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Enter your Wallet Address:</Text>
          <TextInput
            style={styles.input}
            value={userWalletAddress}
            onChangeText={setUserWalletAddress}
            placeholder="0x..."
            placeholderTextColor="#aaa"
          />
        </View>

        <Button
          title={loading ? "Processing..." : "Book Now"}
          onPress={handlePayment}
          align="center"
          disabled={loading}
          width={"100%"}
        />
      </View>
    </ScrollView>
    // </ScreenWraper>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  ethLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 60,
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tripDetailsColumn: {
    flex: 1,
    paddingRight: 20,
  },
  tripText: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  imageColumn: {
    justifyContent: "center",
    alignItems: "center",
  },
  tripImage: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  inputSection: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    height: 45,
    borderWidth: 2,
    width: "95%",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
    alignSelf: "center",
  },
});
