/* eslint-disable prettier/prettier */
import { View, Text, Button, SafeAreaView ,StyleSheet} from "react-native";
import React from "react";
import { router } from "expo-router";
import Header from "@/components/Header";




const Home = () => {
  return (
 <>
      <Header/>
      <Button
        onPress={() => {
          router.push("/popularCompanies");
        }}
        title="See Popular Companies"
      />
       <Button
        onPress={() => {
          router.push("/popularTrips");
        }}
        title="See Popular Trips "
      />
  </>

  );
};

const styles = StyleSheet.create({
 





});




export default Home;