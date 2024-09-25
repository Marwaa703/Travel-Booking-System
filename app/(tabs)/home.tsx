/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
// import InputField from "@/components/InputField";
// import Button from "@/components/Buttons";
// import Rating from "@/components/Rating";
// import Like from "@/components/Like";
// import CardSubtitle from "@/components/CardSubtitle";
// import icons from "@/constants/icons";
import FavoriteCard from "@/components/FavoriteCard";


// import PrimaryButton from "@/src/components/PrimaryButton";
// import SecondaryButton from "@/src/components/SecondaryButton";


const Home = () => {
  return (
    <View>
      <Text style={{ color: COLORS.primary }}>Home Page</Text>
      {/* <PrimaryButton title="Text" onPress={()=>{}}></PrimaryButton>
      <SecondaryButton title="Text" onPress={()=>{}}></SecondaryButton> */}
      {/* <InputField label="Phone Number" placeholder="Enter your phone" type="phone"></InputField>
      <Button type="primary" title="text" align="flex-start" width={"20%"} onPress={()=>{}}></Button>
      <Button type="secondary" title="text" align="flex-end" width={"60%"} onPress={()=>{}}></Button> */}
      <FavoriteCard title="Niladri Reservoir" subtitle="Tekergat, Sunamgnj" image={require("@/assets/tree.jpg")}></FavoriteCard>
      {/* <Rating rate={4} />
      <Like />
      <CardSubtitle
        text="Country"
        icon={icons.location}
        iconColor={COLORS.textSecondary}
      /> */}
    </View>
  );
};

export default Home;