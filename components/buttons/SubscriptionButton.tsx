import { subscribe, unsubscribe } from "@/redux/slices/authSlice";
import React from "react";
import { TouchableOpacity, Text, ViewStyle, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface SubscribeButtonProps {
  type: "primary" | "secondary";
  subscriptionValue: string; // The company ID to subscribe/unsubscribe
  buttonText: string;
  width?: string; // Optional width for the button
  align?: ViewStyle["alignItems"]; // Optional alignment
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  type,
  subscriptionValue,
  buttonText,
  width = "100%",
  align = "flex-end",
}) => {
  const dispatch = useDispatch();

  // Get subscription status from Redux
  const subscribed = useSelector((state: any) =>
    state.auth.subscriptions.companies.findIndex(
      (cId: string) => cId === subscriptionValue,
    ),
  );

  const handleSubscription = () => {
    if (subscribed === -1) {
      dispatch(subscribe({ type: "Company", value: subscriptionValue }));
    } else {
      dispatch(unsubscribe({ type: "Company", value: subscriptionValue }));
    }
  };

  // Internal styles
  const styles = StyleSheet.create({
    button: {
      padding: 5, // Reduced padding
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: align,
      width: "70%",
      backgroundColor:
        subscribed === -1
          ? type === "primary"
            ? "#E88D67"
            : "green" // Primary color for the unclicked state
          : "grey", // Grey when subscribed
    },
    buttonText: {
      color: "white",
      fontWeight: "normal", // Normal font weight
      fontSize: 12, // Font size
      letterSpacing: 0.4,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={handleSubscription}>
      <Text style={styles.buttonText}>
        {subscribed === -1 ? buttonText : "Unsubscribed"}
      </Text>
    </TouchableOpacity>
  );
};

export default SubscribeButton;
