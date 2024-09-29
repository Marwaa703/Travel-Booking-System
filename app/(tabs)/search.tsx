/* eslint-disable prettier/prettier */
import { View} from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import Header from "@/components/Header";

const Search = () => {
  return (
    <View>
      <Header/>
      <Header leftIcon="menu-outline" rightIcon="settings-outline" title="Search" />
      <Header rightIcon="settings-outline"/>
      <Header leftIcon="menu-outline" />
    </View>
  );
};

export default Search;
