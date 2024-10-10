import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { COLORS, FONTS } from "@/constants/theme";

const WeeklyCalendar = () => {
  // Initialize the selected date to today
  const [selectedDate, setSelectedDate] = useState(moment());

  // Handle week navigation (but selected date remains the same)
  const goToPreviousWeek = () => {
    const newDate = moment(selectedDate).subtract(1, "week");
    setSelectedDate(newDate); // Move the selected date to the previous week
  };

  const goToNextWeek = () => {
    const newDate = moment(selectedDate).add(1, "week");
    setSelectedDate(newDate); // Move the selected date to the next week
  };

  // Render the days of the selected week dynamically
  const renderWeekDays = () => {
    const days = [];
    const startOfWeek = moment(selectedDate).startOf("week"); // Start of the current week

    for (let i = 0; i < 7; i++) {
      const day = moment(startOfWeek).add(i, "days");
      const isSelected = selectedDate.isSame(day, "day"); // Check if the day is the selected date

      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayContainer,
            isSelected && styles.selectedDayContainer,
          ]}
          onPress={() => setSelectedDate(day)} // Update selected date when a day is clicked
        >
          <Text
            style={[styles.dayLetter, isSelected && styles.selectedDayLetter]}
          >
            {day.format("ddd")[0]}{" "}
            {/* First letter of day (S, M, T, W, etc.) */}
          </Text>
          <Text
            style={[styles.dayNumber, isSelected && styles.selectedDayNumber]}
          >
            {day.format("D")} {/* Day number */}
          </Text>
        </TouchableOpacity>,
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      {/* Header with selected date */}
      <Text style={styles.currentDateText}>
        {selectedDate.format("DD MMMM YYYY")}
      </Text>

      {/* Week Navigation */}
      <View style={styles.navContainer}>
        {/* Previous Week Button */}
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Ionicons name="chevron-back" size={24} color="#FF6200" />
        </TouchableOpacity>

        {/* Week Days */}
        <View style={styles.weekContainer}>{renderWeekDays()}</View>

        {/* Next Week Button */}
        <TouchableOpacity onPress={goToNextWeek}>
          <Ionicons name="chevron-forward" size={24} color="#FF6200" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
  },
  currentDateText: {
    fontSize: FONTS.large,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 60,
  },
  selectedDayContainer: {
    backgroundColor: COLORS.calendarSelected,
    borderRadius: 10,
  },
  dayLetter: {
    fontSize: 16,
    color: "#000",
  },
  selectedDayLetter: {
    color: "#FF6200",
    fontWeight: "bold",
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedDayNumber: {
    color: "#FF6200",
  },
});

export default WeeklyCalendar;
