import { ScrollView, Text, View, StyleSheet, Alert } from "react-native";
import React, { useCallback, useEffect } from "react";
import Button from "@/components/Buttons";
import Header from "@/components/core/Header";
import UserCard from "@/components/company/UserCard"; // New reusable component
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { FONTS } from "@/constants/theme";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchCompanyUsers } from "@/redux/actions/companiesActions";
import Toast from "react-native-toast-message";

const CompanyUsers = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { companyId } = route.params as { companyId: string };
  const { error, loading, users } = useAppSelector((state) => state.companies);

  // Fetch users when the component is focused
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCompanyUsers(companyId));
    }, [companyId, dispatch]),
  );

  useEffect(() => {
    if (route.params?.newUser) {
      Toast.show({
        text1: "User Added",
        text2: "Your new user has been added successfully!",
      });
    }
  }, [route.params?.newUser]);

  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            // dispatch(deleteUser(userId));
            Toast.show({
              text1: "User Deleted",
              text2: "The user has been deleted successfully!",
            });
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Company Users" />
      <Padding>
        <View style={styles.addButtonContainer}>
          <View style={styles.addButtonWrapper}>
            <Button
              title="Add new user"
              onPress={() => {
                router.push(`/addUser/?companyId=${companyId}`);
              }}
            />
          </View>
        </View>

        {loading ? (
          <Text>Loading users...</Text>
        ) : users.length === 0 ? (
          <Text>No users to display. Add one!</Text>
        ) : (
          <ScrollView>
            <Text style={styles.sectionTitle}>Current Users</Text>
            <Spacer />
            <View style={styles.cardContainer}>
              {users.map((user) => (
                <UserCard
                  key={`user-${user.id}`}
                  user={user}
                  onEdit={() => router.push(`/editUser/?userId=${user.id}`)}
                  onDelete={handleDeleteUser}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </Padding>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 90,
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  addButtonWrapper: {
    width: "70%",
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default CompanyUsers;
