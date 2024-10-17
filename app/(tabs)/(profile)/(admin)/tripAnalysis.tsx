import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import companiesData from "@/DummyData/companies.json";
import tripsData from "@/DummyData/trips.json";
import PieChartComponent from "@/components/charts/PieChart";
import BarChartComponent from "@/components/charts/BarChart";
import Header from "@/components/core/Header";
import Buttons from "@/components/Buttons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, FONTS } from "@/constants/theme";
import Spacer from "@/components/Spacer";
import { router } from "expo-router";

const TripAnalysisScreen: React.FC = () => {
  const trips = tripsData.trips;
  const companies = companiesData.companies;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Helper methods to group trips and retrieve chart data
  const groupTripsByMonth = (trips: any[]) => {
    const groupedTrips: { [key: string]: any[] } = {};
    trips.forEach((trip) => {
      const [startDateString] = trip.date.split(" to ");
      const startDate = dayjs(startDateString);
      if (!startDate.isValid()) return;
      const monthYear = startDate.format("MMMM YYYY");
      if (!groupedTrips[monthYear]) groupedTrips[monthYear] = [];
      groupedTrips[monthYear].push(trip);
    });
    return groupedTrips;
  };

  const getOverallData = () => {
    const statusCounts = trips.reduce((acc, trip) => {
      acc[trip.status] = (acc[trip.status] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(statusCounts),
      data: Object.values(statusCounts),
    };
  };

  const getCompanyData = () => {
    return companies.map((company) => ({
      name: company.title,
      population: company.trips,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));
  };

  const getMonthlyData = (monthlyTrips: any[]) => {
    return {
      labels: ["Scheduled", "Completed", "Ongoing", "Cancelled"],
      datasets: [
        {
          data: [
            monthlyTrips.filter((trip) => trip.status === "Scheduled").length,
            monthlyTrips.filter((trip) => trip.status === "Completed").length,
            monthlyTrips.filter((trip) => trip.status === "Ongoing").length,
            monthlyTrips.filter((trip) => trip.status === "Cancelled").length,
          ],
        },
      ],
    };
  };

  // Logic for date picker
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) setSelectedDate(selectedDate);
  };
  const groupedTrips = groupTripsByMonth(trips);
  const overallData = getOverallData();
  const companyData = getCompanyData();
  const selectedMonthYear = dayjs(selectedDate).format("MMMM YYYY");
  const monthlyTrips = groupedTrips[selectedMonthYear] || [];

  return (
    <>
      <Header
        title="Trips Analysis"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <ScrollView style={styles.container}>
        <PieChartComponent
          title="Overall Trip Status"
          data={overallData.labels.map((label, index) => ({
            name: label,
            population: Number(overallData.data[index]),
            color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            legendFontColor: COLORS.textSecondary,
            legendFontSize: 15,
          }))}
        />
        <PieChartComponent title="Trips by Company" data={companyData} />

        <View style={styles.datePickerContainer}>
          <Text style={styles.datePickerText}>Select Month and Year</Text>
          <Buttons
            type="secondary"
            title="Pick Date"
            onPress={() => setShowDatePicker(true)}
            width="80%"
            align="flex-end"
            fontSize={FONTS.normal}
          />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <Spacer />
        <BarChartComponent
          title="Monthly Trip Status Analysis"
          selectedMonthYear={selectedMonthYear}
          data={getMonthlyData(monthlyTrips)}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 90,
  },

  datePickerText: {
    fontSize: FONTS.normal,
    fontWeight: "500",
    color: COLORS.textPrimary,
    textAlign: "left",
  },

  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default TripAnalysisScreen;
