/* eslint-disable prettier/prettier */
import { Text, View,StyleSheet, ScrollView} from "react-native";
import React from "react";

// import Button from "@/components/Buttons";
import { router } from "expo-router";
import Header from "@/components/core/Header";
import { COLORS, FONTS } from "@/constants/theme";
import Spacer from "@/components/Spacer";
import TripProfileCard from "@/components/TripProfileCard";
import { trips } from "@/DummyData/trips.json";
import Padding from "@/components/containers/Padding";



const Calendar = () => {
  {/* <Button title={" Trip Instruction"} onPress={()=>{router.push("/tripIns")}}/> */}
  return (
    <View style={styles.container}>
      <Header title="Schedule" leftIcon="chevron-back" onLeftIconPress={()=>router.push("home")}></Header>
      <View>
        <Text>Calendar</Text>
      </View>
      <Spacer/>

      <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>My Schedule</Text>
            <Text style={styles.viewAll} onPress={() => {}}>View All</Text>
      </View>

      <Spacer/>
      <ScrollView>
        <Padding>
      <View style={{marginTop:10}}>
          {trips.map((trip, index) => (
            <View key={index} style={styles.cardWrapper}>
              <TripProfileCard
                image={{uri:trip.image}}
                title={trip.title}
                date={trip.date}
                rating={trip.rating}
                price={trip.price}
                avatars={[{uri:"https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"},
                  {uri:"https://static.vecteezy.com/system/resources/previews/014/212/681/original/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions-for-website-and-mobile-app-design-illustration-on-a-white-isolated-background-vector.jpg"},
                  {uri:"https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"}]}
                peopleJoined={trip.peopleJoined}
              />
            </View>
          ))}
        </View>
        </Padding>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1
  },
  subtitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:20
  },
  viewAll: {
    fontSize: FONTS.normal,
    color: COLORS.secondary,
  },
  cardWrapper: {
    marginBottom: 20,
  },

});

export default Calendar;
