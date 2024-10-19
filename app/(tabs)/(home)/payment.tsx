/* eslint-disable react-native/no-unused-styles */

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Button from "@/components/Buttons";
import { ColorPalette, COLORS, FONTS } from "@/constants/theme";
import { fetchTripDetails, makePayment, bookTrip } from "@/api/payment";
import { useAppSelector } from "@/redux/store";
import { User } from "@/types/user";
import CustomAlert from "@/components/core/Alert";
import FormatDate from "@/components/core/FormatDate";
import { selectTripById } from "@/redux/slices/tripsSlice";
import Spacer from "@/components/Spacer";
import ScreenWraper from "@/components/containers/ScreenWraper";
import TextInputField from "@/components/forms/TextInputField";
import Label from "@/components/forms/Label";
import useLoadingState from "@/hooks/useLoadingSate";
import { Ionicons } from "@expo/vector-icons";
import Padding from "@/components/containers/Padding";
import { ExchangeRatesResponse, getExchangeRates } from "@/api/etherRateApi";
import Header from "@/components/core/Header";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

const Payment: React.FC = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);

  const { loading, msg, setLoading, setMsg } = useLoadingState();
  const [rates, setRates] = useState<ExchangeRatesResponse | undefined>(
    undefined,
  );
  const [tripCostUSD, setTripCostUSD] = useState<number>(0);
  const [tripCostEther, setTripCostEther] = useState<number>(0);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("");

  const route = useRoute();
  const { tripId } = route.params as { tripId: string };
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");
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
  const paymentState = [
    "Processing your payment...",
    "waiting for confirmation from the network..",
  ];

  useEffect(() => {
    const calculateRates = async () => {
      try {
        const data = await getExchangeRates();
        setRates(data);
        setLastUpdateTime(data.date);

        // Assuming tripDetails.price is in USD
        const tripCostInUSD = tripDetails?.price; // This should be the trip price in USD
        setTripCostUSD(tripCostInUSD);

        // Calculate the equivalent amount in Ether
        const etherRate = data.rates.ETH; // Get the ETH rate from the API
        if (etherRate > 0) {
          const etherAmount = tripCostInUSD * etherRate; // Convert USD to ETH
          setTripCostEther(etherAmount);
        }
      } catch (err) {
        console.log({ error: err });
      }
    };

    if (tripDetails) {
      calculateRates();
    }
  }, [tripDetails]);

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
    setMsg(paymentState[0]);
    setLoading(true);
    try {
      const paymentResponse = await makePayment(
        tripDetails.company_id,
        tripId,
        userWalletAddress,
        tripDetails?.price, // Assuming this is in Wei
      );
      const { transactionHash } = paymentResponse;

      setAlert({
        message: `Payment Successful! Transaction hash: ${transactionHash}`,
        type: "success",
      });

      setMsg(paymentState[1]);
      const bookingResponse = await bookTrip(
        tripId,
        userId as string,
        transactionHash,
      );
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
      setMsg("");
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
    <>
      <Header
        title="Payment"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.navigate(`tripDetails?id=${tripId}`)}
      />
      <View style={styles.main}>
        <ScreenWraper>
          <ScrollView contentContainerStyle={styles.container}>
            <Padding>
              <Spacer />

              <View style={styles.logoContainer}>
                <Image
                  source={require("../../../assets/eth_logo.png")}
                  style={styles.ethLogo}
                />
              </View>
              {alert && (
                <CustomAlert message={alert.message} type={alert.type} />
              )}
              <Spacer height={26} />
              <View style={styles.section}>
                <View style={styles.infoSection}>
                  <View style={styles.tripDetailsColumn}>
                    <View style={styles.row}>
                      <Ionicons
                        name="location"
                        size={18}
                        color={COLORS.primary}
                      />
                      <Text style={styles.tripText}>{tripDetails.name}</Text>
                    </View>
                    <View style={styles.row}>
                      <Ionicons name="time" size={18} color={COLORS.primary} />
                      <Text style={styles.tripText}>
                        {<FormatDate dateString={tripDetails.date} />}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Ionicons
                        name="logo-usd"
                        size={18}
                        color={COLORS.primary}
                      />
                      <Text style={styles.tripText}>{tripCostUSD} USD</Text>
                    </View>
                    <View style={styles.row}>
                      <Ionicons name="card" size={18} color={COLORS.primary} />
                      <Text style={styles.tripText}>
                        {tripCostEther.toFixed(6)} ETH
                      </Text>
                    </View>
                  </View>

                  <View style={styles.imageColumn}>
                    <Image source={{ uri: image }} style={styles.tripImage} />
                  </View>
                </View>

                <Spacer height={50} />
                <View>
                  <View style={styles.row}>
                    <Ionicons
                      name="analytics"
                      size={18}
                      color={COLORS.primary}
                    />
                    <Text style={styles.tripText}>
                      Rate: {rates?.rates.ETH}{" "}
                      <Text style={{ color: COLORS.primary }}>USD/ETH</Text>
                    </Text>
                  </View>
                  <Spacer />
                  <View style={styles.row}>
                    <Ionicons
                      name="timer-outline"
                      size={18}
                      color={COLORS.primary}
                    />
                    <Text style={styles.tripText}>{lastUpdateTime}</Text>
                  </View>
                </View>
                <Spacer height={20} />
                <View>
                  <Label
                    text="Enter your Wallet Address:"
                    style={{ color: COLORS.secondary }}
                  />
                  <Spacer height={8} />
                  <TextInputField
                    name={"your wallet address ex: 0xa2..."}
                    onBlur={undefined}
                    onChangeText={setUserWalletAddress}
                    value={userWalletAddress}
                    icon="wallet"
                  />
                </View>
                <Spacer height={8} />
                <Button
                  title={"Pay"}
                  onPress={handlePayment}
                  align="flex-start"
                  disabled={loading}
                  width={"100%"}
                  loading={loading}
                  loadingMessage={msg}
                />
                <Spacer height={50} />
              </View>
            </Padding>
          </ScrollView>
        </ScreenWraper>
      </View>
    </>
  );
};
// todo:
export default Payment;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    main: { flex: 1 },
    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
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
      width: 50,
      height: 50,
      resizeMode: "contain",
    },
    section: {
      // backgroundColor: COLORS.bg_surface,
      flexGrow: 1,
      justifyContent: "space-between",
      padding: 5,
    },
    infoSection: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tripDetailsColumn: {
      flex: 1,
      paddingRight: 20,
      justifyContent: "space-between",
    },
    tripText: {
      fontSize: FONTS.normal,
      color: COLORS.textPrimary,
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
    },
    row: {
      flexDirection: "row",
      columnGap: 6,
      paddingRight: 6,
    },
  });
