/* eslint-disable react-native/no-unused-styles */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/core/Header";
import { getInstructionsByTripId } from "@/api/trips/tripInstruction";
import { TripInstruction } from "@/types/trip";
import { useAppSelector } from "@/redux/store";
import { selectTripById } from "@/redux/slices/tripsSlice";
import StarRating from "@/components/StarRating";
import { updateTrip } from "@/api/trips/trip";
import { useDispatch } from "react-redux";
import { moveTripToPrevious } from "@/redux/slices/tripsSlice";
import Spacer from "@/components/Spacer";

const TripInstructions: React.FC = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);

  const route = useRoute();
  const { tripId } = route.params as { tripId: string };
  const [chatMessages, setChatMessages] = useState<TripInstruction[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<TripInstruction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const trip = useAppSelector((state) => selectTripById(state.trips, tripId));
  const dispatch = useDispatch();

  const hasTripEnded = trip.end_date && new Date(trip.end_date) <= new Date();
  useEffect(() => {
    if (!hasTripEnded) {
      const fetchInstructions = async () => {
        setLoading(true);
        try {
          const instructions = await getInstructionsByTripId(tripId);
          setChatMessages(instructions);
        } catch (err: any) {
          setError(err.message || "Failed to load instructions");
        } finally {
          setLoading(false);
        }
      };

      fetchInstructions();
    }
  }, [tripId, hasTripEnded]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        const visibleMessages = chatMessages.filter(
          (message) =>
            new Date(message.display_time).getTime() <= currentTime.getTime(),
        );
        setVisibleMessages(visibleMessages);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [chatMessages]);

  const formatTimestamp = (display_time: string) => {
    const date = new Date(display_time);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  const renderMessage = ({ item }: { item: TripInstruction }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.instruction}</Text>
      <Text style={styles.messageTime}>
        {formatTimestamp(item.display_time)}
      </Text>
    </View>
  );

  const handleRatingChange = async (rate: number) => {
    try {
      const updatedTripRate = await updateTrip(tripId, {
        rate,
        status: "completed",
      });
      console.log({ updatedTripRate });
      dispatch(moveTripToPrevious(updatedTripRate));
      setRatingSubmitted(true);
    } catch (error) {
      console.error("Failed to update trip rating:", error);
      setError("Failed to submit rating. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text>Loading Instructions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  // console.log({ user });
  const handleCall = async () => {
    const url = `tel:01205175195`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Phone call is not supported on this device");
    }
  };

  return (
    <>
      <Header
        title={trip.name}
        rightIcon="call-outline"
        leftIcon="arrow-back"
        onRightIconPress={handleCall}
        onLeftIconPress={() => {
          router.back();
        }}
      />
      <View style={styles.container}>
        {!hasTripEnded ? (
          <>
            <FlatList
              data={visibleMessages}
              renderItem={renderMessage}
              keyExtractor={(item) => item?.instruction_id.toString()}
              contentContainerStyle={styles.chatContainer}
            />
            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>
                The instructions for your trip will appear here in time.
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.bottomTextContainer}>
            <Text style={styles.endTripText}>
              Your adventure has come to a close! We hope you enjoyed every
              moment. Thank you for being with us!
            </Text>
          </View>
        )}
        {hasTripEnded && (
          <View style={styles.ratingContainer}>
            {!ratingSubmitted ? (
              <>
                <Text style={styles.ratingText}>Rate your trip:</Text>
                <StarRating onRatingChange={handleRatingChange} />
              </>
            ) : (
              <Text style={styles.thankYouText}>
                Thank you for your rating!
              </Text>
            )}
          </View>
        )}
        <Spacer height={80} />
      </View>
    </>
  );
};

export default TripInstructions;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
      padding: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.bg,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      fontSize: 18,
      color: COLORS.error,
    },
    chatContainer: {
      flexGrow: 1,
      justifyContent: "flex-end",
    },
    messageContainer: {
      backgroundColor: COLORS.bg_surface,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      alignSelf: "flex-start",
      maxWidth: "80%",
    },
    messageText: {
      fontSize: 16,
      color: COLORS.textPrimary,
    },
    messageTime: {
      fontSize: 12,
      color: COLORS.textSecondary,
      textAlign: "right",
      marginTop: 5,
    },
    bottomTextContainer: {
      alignItems: "center",
      padding: 10,
      backgroundColor: COLORS.bg,
    },
    bottomText: {
      fontSize: 14,
      color: COLORS.error,
      // fontWeight: "bold",
      textAlign: "center",
    },
    endTripText: {
      textAlign: "center",
      color: COLORS.success,
      fontWeight: "bold",
    },
    ratingContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    ratingText: {
      fontSize: 18,
      // fontWeight: "bold",
      marginBottom: 10,
      color: COLORS.textPrimary,
    },
    thankYouText: {
      fontSize: 18,
      // fontWeight: "bold",
      color: COLORS.success,
    },
  });
