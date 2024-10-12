import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { COLORS } from "@/constants/theme";
import Header from "@/components/core/Header";
import { getInstructionsByTripId } from "@/api/trips/tripInstruction";
import { TripInstruction } from "@/types/trip";

const TripInstructions: React.FC = () => {
  const route = useRoute();
  const { tripId } = route.params as { tripId: string };
  const [chatMessages, setChatMessages] = useState<TripInstruction[]>([]);
  const [visibleMessages, setVisibleMessages] = useState<TripInstruction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [tripId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const visibleMessages = chatMessages.filter(
        (message) =>
          new Date(message.display_time).getTime() <= currentTime.getTime(),
      );
      setVisibleMessages(visibleMessages);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chatMessages]);

  const formatTimestamp = (display_time: string) => {
    const date = new Date(display_time);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
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

  return (
    <>
      <Header
        title={`Trip ${tripId}`} //^ Display the trip name not trip id
        rightIcon="call-outline"
        leftIcon="arrow-back"
        onRightIconPress={() => {}}
        onLeftIconPress={() => {
          router.back();
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={visibleMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.instruction_id.toString()}
          contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>
            The instructions for your trip will appear here in time.
          </Text>
        </View>
      </View>
    </>
  );
};

export default TripInstructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginBottom: 90,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: COLORS.calendarSelected,
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
    backgroundColor: "#f0f0f0",
  },
  bottomText: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: "bold",
  },
});
