/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import SettingCard from "@/components/SettingContainer";
import NotificationCard from "@/components/NotificationCard";
import TripProfileCard from "@/components/TripProfileCard";
import InputField from "@/components/InputField";
import Button from "@/components/Buttons";
import Rating from "@/components/Rating";
import Like from "@/components/Like";
import CardSubtitle from "@/components/CardSubtitle";
import icons from "@/constants/icons";
import FavoriteCard from "@/components/FavoriteCard";
import Card from "@/components/Card";



const Home = () => {
  return (
    <View>
      {/* <Text style={{ color: COLORS.primary }}>Home Page</Text> */}
      
      
      <InputField label="Phone Number" placeholder="Enter your phone" type="phone"></InputField>
      <Button type="primary" title="text" align="center" width={"20%"} onPress={()=>{}}></Button>
      <Button type="secondary" title="text" align="center" width={"60%"} onPress={()=>{}}></Button>
      {/* <FavoriteCard title="Niladri Reservoir" subtitle="Tekergat, Sunamgnj" image={require("@/assets/tree.jpg")}></FavoriteCard> */}
      {/* <Rating rate={4} />
      <Like />
      <CardSubtitle
        text="Country"
        icon={icons.location}
        iconColor={COLORS.textSecondary}
      /> */}
      {/* <Card image={require("@/assets/tree.jpg")} title="Casa Las Tirtugas" subtitle="Av Damero, Mexico" rating={3.5} price="$894"></Card>
      <Card image={require("@/assets/tree.jpg")} title="Casa Las Tirtugas" subtitle="Av Damero, Mexico" rating={3.5} buttonText="Subscripe"></Card> */}
      {/* <TripProfileCard title="Santorini Islnd" image={require("@/assets/tree.jpg")} date="16 July-28 July" rating={4.5} price="820" peopleJoined={42} avatars={[require("@/assets/tree.jpg"),require("@/assets/tree.jpg"),require("@/assets/tree.jpg")]}></TripProfileCard> */}
      {/* <SettingCard title="Current Trips" onPress={()=>{}}  leftIconName="bookmark-border"></SettingCard> */}
      {/* <NotificationCard avatar={require("@/assets/tree.jpg")} title="Super Offer" description="Get 60% off in our first booking" onPress={()=>{}}></NotificationCard> */}
    </View>
  );
};

export default Home;