import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Toast, { ToastShowParams } from "react-native-toast-message";
interface NotifyProps {
  data: ToastShowParams;
}
const Notify = ({ data }: NotifyProps) => {
  Toast.show(data);
  return (
    <View>
      <Text>Notify</Text>
    </View>
  );
};

export default Notify;

const styles = StyleSheet.create({});
