import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import Alert from "@/components/core/Alert";
import Header from "@/components/core/Header";
import Button from "@/components/Buttons";
import InputField from "@/components/InputField";
import {
  addInstruction,
  getInstructionsByTripId,
} from "@/api/trips/tripInstruction";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TripInstruction } from "@/types/trip";
import TextInputField from "@/components/forms/TextInputField";
import ScreenWraper from "@/components/containers/ScreenWraper";

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
      <Header title="Trip Instruction" />
      <View style={styles.container}>
        <Text>Instruction</Text>
        <TextInputField
          name={"Trip instruction"}
          onChangeText={setInstruction}
          onBlur={undefined}
          value={instruction}
          icon="clipboard-outline"
          trim={false}
        />

        <Text>Select display time</Text>
        <View style={styles.dateTimeContainer}>
          <Button
            title={
              displayTime ? displayTime.toLocaleDateString() : "Select Date"
            }
            onPress={() => setShowDatePicker(true)}
            type="secondary"
            width="80%"
            align="center"
          />
          {Platform.OS === "android" && (
            <Button
              title={
                displayTime ? displayTime.toLocaleTimeString() : "Select Time"
              }
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

        <View style={styles.error}>
          {alertMessage && alertType && (
            <Alert message={alertMessage} type={alertType} />
          )}
        </View>

        {/* Display Instructions in a Table */}
        <Text style={styles.tableHeader}>Instructions List</Text>
        <View style={styles.table}>
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  error: {
    padding: 20,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  table: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    width: "50%",
    textAlign: "left",
    flexWrap: "wrap",
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    width: "50%",
  },
});

export default TripEdit;
