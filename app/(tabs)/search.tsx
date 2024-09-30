/* eslint-disable prettier/prettier */
import { Text, View} from "react-native";
import React from "react";
import Header from "@/components/core/Header";

const Search = () => {
  return (
    <View>
      <Header/>
      <Header leftIcon="menu-outline" rightIcon="settings-outline" title="Search" />
      <Header rightIcon="settings-outline"/>
      <Header leftIcon="menu-outline" />

<Header 
  leftIcon="menu-outline" 
  rightIcon="settings-outline" 
  title="Search" 
  onLeftIconPress={() => console.log('Menu pressed')}
  onRightIconPress={() => console.log('Settings pressed')}
/>

<Text> Note: Header Component has a Default parameters and Default On press ,IF you only change the icon, it will redirect to default Router {"\n"}
  ,,,Please always remember if you change the icon , change also its on press , to avoid hours of debugging :)  
</Text>


  </View>
  );
};

export default Search;
