/* eslint-disable react-native/no-unused-styles */
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Button from "@/components/Buttons";
import Header from "@/components/core/Header";
import UserCard from "@/components/company/UserCard"; // New reusable component
import Padding from "@/components/containers/Padding";
import Spacer from "@/components/Spacer";
import { ColorPalette, COLORS, FONTS } from "@/constants/theme";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  deleteCompanyUser,
  fetchCompanyUsers,
} from "@/redux/actions/companiesActions";
import Toast from "react-native-toast-message"; // Import if needed for typing
import TextNote from "@/components/forms/TextNote";
import { useTheme } from "@/hooks/useTheme";

const CompanyUsers = () => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
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
    if (route.params?.addUser) {
      Toast.show({
        text1: "User Added",
        text2: "Your new user has been added successfully!",
        type: "success",
      });
    }
  }, [route.params?.addUser]);

  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      "Delete User",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteCompanyUser(userId));
            Toast.show({
              text1: "User Deleted",
              text2: "The user has been deleted successfully!",
              type: "success",
              topOffset: 80,
            });
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Company Users"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
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
      <Toast />

      {loading ? (
        <Padding>
          <TextNote note="Loading users..." />
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </Padding>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Current Users</Text>
          <ScrollView>
            <Padding>
              <Spacer />
              <View style={styles.cardContainer}>
                {users.map((user) => (
                  <Fragment key={user?.id}>
                    {user && (
                      <UserCard
                        user={user}
                        onEdit={() => {
                          router.push(
                            `/editUser/?user=${JSON.stringify(user)}`,
                          );
                        }}
                        onDelete={handleDeleteUser}
                      />
                    )}
                    <Spacer height={16} />
                  </Fragment>
                ))}
              </View>
            </Padding>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.bg,
      paddingBottom: 90,
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
      fontWeight: "500",
      marginLeft: 18,
      color: COLORS.textPrimary,
    },
    cardContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  });

export default CompanyUsers;
