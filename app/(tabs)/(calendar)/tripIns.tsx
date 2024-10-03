/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import messagesData from '@/DummyData/messages.json';
import Header from '@/components/core/Header';
import { useRoute } from "@react-navigation/native"; 
import { router } from 'expo-router';
import { trips } from "@/DummyData/trips.json";
import { COLORS } from '@/constants/theme';

interface Message {
  id: number;
  text: string;
  timestamp: string;  
}
interface Trip {
  id: number;
  title: string;
}

const TripInstruction: React.FC = () => {
  const route = useRoute();  
  const { tripId } = route.params as { tripId: string };
  const tripIdNumber = Number(tripId);
  const trip = trips.find((t) => t.id === tripIdNumber) as Trip | undefined;

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
  
      const visibleMessages = messagesData.filter(
        message => new Date(message.timestamp).getTime() <= currentTime.getTime()
      );
      setChatMessages(visibleMessages);
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{formatTimestamp(item.timestamp)}</Text>
    </View>
  );

  return (
    <>
      <Header 
        title={trip?.title}
        rightIcon='call-outline'
        leftIcon='arrow-back'
        onRightIconPress={() => {}}
        onLeftIconPress={() => { router.back(); }}
      />
      <View style={styles.container}>
        <FlatList
          data={chatMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>The Instruction of your trip will appear here in time</Text>
        </View>
      </View>
    </>
  );
};

export default TripInstruction;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 90, 
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    backgroundColor: COLORS.calendarSelected,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  messageTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: 5,
  },
  bottomTextContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  bottomText: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: 'bold',
  },
});
