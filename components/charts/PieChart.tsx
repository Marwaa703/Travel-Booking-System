import { COLORS } from "@/constants/theme";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface PieChartData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface PieChartProps {
  title: string;
  data: PieChartData[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ title, data }) => {
  return (
    <View style={styles.pieContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={screenWidth - 40}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
        />
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#f8f8f8",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(34, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  pieContainer: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 5,
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: COLORS.textPrimary,
    paddingLeft: 20,
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default PieChartComponent;
