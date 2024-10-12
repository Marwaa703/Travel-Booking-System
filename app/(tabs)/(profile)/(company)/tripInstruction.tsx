import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Alert from "@/components/core/Alert";
import Header from "@/components/core/Header";
import Button from "@/components/Buttons";
import InputField from "@/components/InputField";
import { addInstruction } from "@/api/trips/tripInstruction";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TripEdit: React.FC = () => {
  const [instruction, setInstruction] = useState("");
  const [displayTime, setDisplayTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "info" | null
  >(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { id } = route.params as { id: string };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDisplayTime((prevDate) => {
        const time = prevDate || new Date();
        selectedDate.setHours(time.getHours());
        selectedDate.setMinutes(time.getMinutes());
        return selectedDate;
      });
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDisplayTime((prevDate) => {
        const date = prevDate || new Date();
        date.setHours(selectedTime.getHours());
        date.setMinutes(selectedTime.getMinutes());
        return date;
      });
    }
  };

  const handleSubmit = async () => {
    if (!instruction || !displayTime) {
      setAlertMessage("Instruction and display time are required!");
      setAlertType("error");
      return;
    }

    const instructionData = {
      trip_id: id,
      instruction,
      display_time: displayTime?.toISOString(),
    };

    try {
      setLoading(true);
      const response = await addInstruction(instructionData);
      setAlertMessage("Instruction added successfully!");
      setAlertType("success");
    } catch (error: any) {
      setAlertMessage(error.message || "Failed to add instruction");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Trip Instruction" />
      <View style={styles.container}>
        <InputField
          label="Trip instruction"
          placeholder="Enter trip instruction"
          onChangeText={setInstruction}
        />

        <Button
          title={displayTime ? displayTime.toLocaleString() : "Select Date"}
          onPress={() => setShowDatePicker(true)}
          type="secondary"
          width="50%"
          align="flex-end"
        />

        {showDatePicker && (
          <DateTimePicker
            value={displayTime || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {Platform.OS === "android" && (
          <Button
            title={
              displayTime ? displayTime.toLocaleTimeString() : "Select Time"
            }
            onPress={() => setShowTimePicker(true)}
            type="secondary"
            width="50%"
            align="flex-end"
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={displayTime || new Date()}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange}
          />
        )}

        <Button
          title={loading ? "Submitting..." : "Add Instruction"}
          onPress={handleSubmit}
          width="90%"
          disabled={loading}
          align="center"
        />
        <View style={styles.error}>
          {alertMessage && alertType && (
            <Alert message={alertMessage} type={alertType} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 20,
    backgroundColor: "#f5f5f5",
  },
  error: {
    padding: 20,
  },
});

export default TripEdit;
