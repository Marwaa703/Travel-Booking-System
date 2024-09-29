/* eslint-disable prettier/prettier */

import {ScrollView, View } from "react-native";
import React from "react";
import TripProfileCard from "@/components/TripProfileCard";
import { FONTS, SPACING } from "@/constants/theme";
import Padding from "@/components/containers/Padding";


const PopularTrips = () => {
  return (

    // todo: fixe sizing based on bottom navigation to be a padding from bottom
    <ScrollView style={{marginBottom:75 ,}}>
        <Padding>
      <View style={{rowGap:SPACING.small,marginVertical:FONTS.medium}}>


    <TripProfileCard image={{uri:"https://www.worldatlas.com/upload/84/c1/6a/shutterstock-1031949604.jpg"}} title="Santorini Islnd" date="16 July-28 July" rating={4.8} peopleJoined={24} price="820" avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}></TripProfileCard>
    <TripProfileCard image={{uri:"https://ramonfadli.com/wp-content/uploads/2020/11/D7K_5210.jpg"}} title="Bukit Rayandro" date="20 Sep-29 Sep" rating={4.3} peopleJoined={24} price="720" avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}></TripProfileCard>
    <TripProfileCard image={{uri:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900"}} title="Eiffel Tower" date="14 Nov-22Nov" rating={4.9} peopleJoined={26} price="942" avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}></TripProfileCard>
    <TripProfileCard image={{uri:"https://pegah.com.bd/images/tourist-spot/1691658816163_gallary_1jpg.jpg"}} title="Sajek Bandarban" date="12 Dec-18 Dec" rating={4.5} peopleJoined={27} price="860" avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}></TripProfileCard>
    <TripProfileCard image={{uri:"https://cdn.britannica.com/06/122506-050-C8E03A8A/Pyramid-of-Khafre-Giza-Egypt.jpg"}} title="Pyramids Of Egypt" date="14 Nov-22Nov" rating={5} peopleJoined={26} price="985" avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}></TripProfileCard>
    <TripProfileCard image={{uri:"https://d3rr2gvhjw0wwy.cloudfront.net/uploads/mandators/49581/file-manager/karnak-temple.jpg"}} title="karnak temple" date="14 Nov-22Nov" rating={3.6} peopleJoined={30} price="542" avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}></TripProfileCard>
    <TripProfileCard image={{uri:"https://egyptescapes.com/wp-content/uploads/2021/04/when-will-the-grand-egyptian-museum-open-scaled.jpg"}} title="Egyptian Museum" date="14 Nov-22Nov" rating={4.6} peopleJoined={30} price="542" avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},{uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}></TripProfileCard>

      </View>
        </Padding>
    </ScrollView>
  );
};

export default PopularTrips;
