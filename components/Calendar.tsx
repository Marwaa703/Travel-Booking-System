/* eslint-disable react-native/no-unused-styles */

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { ColorPalette, FONTS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

const WeeklyCalendar = ({ tripStartDates }) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);

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

      // Check if the day matches any of the trip start dates
      const hasTrip = tripStartDates.includes(day.format("YYYY-MM-DD"));

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
          <Text>
            {hasTrip && <View style={styles.dot} />} {/* Display the dot */}
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

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      width: "100%",
      // backgroundColor: COLORS.bg_surface,
    },
    currentDateText: {
      fontSize: FONTS.large,
      textAlign: "center",
      // fontWeight: "bold",
      color: COLORS.textPrimary,
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
      color: COLORS.textPrimary,
    },
    selectedDayLetter: {
      color: "#FF6200",
      fontWeight: "bold",
    },
    dayNumber: {
      fontSize: 16,
      // fontWeight: "bold",
      color: COLORS.textSecondary,
    },
    selectedDayNumber: {
      color: "#FF6200",
    },
    dot: {
      width: 6,
      height: 6,
      backgroundColor: "#FF6200",
      borderRadius: 3,
      marginTop: 4,
    },
  });

export default WeeklyCalendar;
