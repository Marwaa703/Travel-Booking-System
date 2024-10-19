/* eslint-disable react-native/no-unused-styles */

import { ColorPalette, COLORS } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface BarChartProps {
  title: string;
  selectedMonthYear: string;
  data: any;
}

const BarChartComponent: React.FC<BarChartProps> = ({
  title,
  selectedMonthYear,
  data,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  return (
    <View style={styles.barContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Text style={styles.chartMonth}>{selectedMonthYear}</Text>
      <View style={styles.monthContainer}>
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={300}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={25}
          style={styles.chart}
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
  barPercentage: 0.6,
  propsForLabels: {
    fontSize: 12,
    fontWeight: "bold",
  },
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    barContainer: {
      marginBottom: 40,
      backgroundColor: "#fff",
      borderRadius: 10,
      elevation: 3,
      padding: 5,
    },
    chartTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginTop: 30,
      color: COLORS.textPrimary,
      paddingLeft: 20,
    },
    chartMonth: {
      fontSize: 22,
      fontWeight: "bold",
      color: COLORS.secondary,
      marginBottom: 20,
      paddingLeft: 20,
    },
    monthContainer: {
      marginBottom: 40,
    },
    chart: {
      borderRadius: 5,
      elevation: 5,
    },
  });

export default BarChartComponent;
