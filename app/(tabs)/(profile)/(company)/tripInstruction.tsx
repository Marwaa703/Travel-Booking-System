/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import Alert from "@/components/core/Alert";
import Header from "@/components/core/Header";
import Button from "@/components/Buttons";
import {
  addInstruction,
  getInstructionsByTripId,
} from "@/api/trips/tripInstruction";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TripInstruction } from "@/types/trip";
import TextInputField from "@/components/forms/TextInputField";
import { router } from "expo-router";
import { ColorPalette } from "@/constants/theme";
import Label from "@/components/forms/Label";
import Spacer from "@/components/Spacer";
import { useTheme } from "@/hooks/useTheme";

const TripEdit: React.FC = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const [instruction, setInstruction] = useState("");
  const [displayTime, setDisplayTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "info" | null
  >(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [instructions, setInstructions] = useState<TripInstruction[]>([]);

  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const fetchedInstructions = await getInstructionsByTripId(id);
        setInstructions(fetchedInstructions);
      } catch (error: any) {
        setAlertMessage("Failed to load instructions");
        setAlertType("error");
      }
    };

    fetchInstructions();
  }, [id]);

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
      const newInstruction = await addInstruction(instructionData);
      setInstructions((prevInstructions) => [
        ...prevInstructions,
        newInstruction,
      ]);
      setAlertMessage("Instruction added successfully!");
      setAlertType("success");
      setInstruction("");
      setDisplayTime(null);
    } catch (error: any) {
      setAlertMessage(error.message || "Failed to add instruction");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const renderInstruction = ({ item }: { item: TripInstruction }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.instruction}</Text>
      <Text style={styles.tableCell}>
        {new Date(item.display_time).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <>
      <Header
        title="Trip Instruction"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <View style={styles.container}>
        <Label text="Instruction" />
        <Spacer height={4} />
        <TextInputField
          name={"Trip instruction"}
          onChangeText={setInstruction}
          onBlur={undefined}
          value={instruction}
          icon="clipboard-outline"
          trim={false}
        />

        <Spacer />

        <Label text="Select display date & time" />
        {/* <Text>Select display time</Text> */}
        <View style={styles.dateTimeContainer}>
          <Button
            title={displayTime ? displayTime.toLocaleDateString() : "Date"}
            onPress={() => setShowDatePicker(true)}
            type="secondary"
            width="80%"
            align="center"
            fontSize={14}
          />
          {Platform.OS === "android" && (
            <Button
              fontSize={14}
              title={displayTime ? displayTime.toLocaleTimeString() : "Time"}
              onPress={() => setShowTimePicker(true)}
              type="secondary"
              width="80%"
              align="center"
            />
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={displayTime || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
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
        <Spacer />
        {alertMessage && alertType && (
          <View style={styles.error}>
            <Alert message={alertMessage} type={alertType} />
          </View>
        )}
        {/* Display Instructions in a Table */}
        <Text style={styles.tableHeader}>Instructions List</Text>
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Instruction</Text>
            <Text style={styles.tableHeaderCell}>Display Time</Text>
          </View>
          <FlatList
            data={instructions}
            renderItem={renderInstruction}
            keyExtractor={(item) => item.instruction_id}
          />
        </View>
      </View>
    </>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: COLORS.bg,
    },
    error: {
      padding: 20,
    },
    dateTimeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 16,
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.textSecondary,
    },
    tableCell: {
      width: "50%",
      textAlign: "left",
      flexWrap: "wrap",
      color: COLORS.textSubtitle,
      fontSize: 12,
    },
    tableHeader: {
      fontSize: 18,
      // fontWeight: "bold",
      marginVertical: 10,
      color: COLORS.textPrimary,
    },
    tableHeaderCell: {
      fontWeight: "400",
      width: "50%",
      color: COLORS.textPrimary,
    },
  });

export default TripEdit;
