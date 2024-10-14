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
import { COLORS, FONTS } from "@/constants/theme";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  deleteCompanyUser,
  fetchCompanyUsers,
} from "@/redux/actions/companiesActions";
import Toast, { ToastShowParams } from "react-native-toast-message"; // Import if needed for typing
import Notify from "@/components/notifications/Notify";

const CompanyUsers = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();

  const { companyId } = route.params as { companyId: string };
  const { error, loading, users } = useAppSelector((state) => state.companies);

  const [toastData, setToastData] = useState<ToastShowParams | null>(null); // State for toast messages

  // Fetch users when the component is focused
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchCompanyUsers(companyId));
    }, [companyId, dispatch]),
  );

  useEffect(() => {
    if (route.params?.addUser) {
      setToastData({
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
            setToastData({
              text1: "User Deleted",
              text2: "The user has been deleted successfully!",
              type: "success",
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
        <Padding>
          <Text>Loading users...</Text>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </Padding>
      ) : users.length === 0 ? (
        <Text>No users to display. Add one!</Text>
      ) : (
        <ScrollView>
          <Padding>
            <Text style={styles.sectionTitle}>Current Users</Text>
            <Spacer />
            <View style={styles.cardContainer}>
              {users.map((user) => (
                <Fragment key={user?.id}>
                  {user && (
                    <UserCard
                      user={user}
                      onEdit={() =>
                        router.push(`/editUser/?userId=${user?.id}`)
                      }
                      onDelete={handleDeleteUser}
                    />
                  )}
                  <Spacer height={16} />
                </Fragment>
              ))}
            </View>
          </Padding>
        </ScrollView>
      )}
      {toastData && <Notify data={toastData} />}
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
