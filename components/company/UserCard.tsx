import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CompanyUser, CompanyUserRoles } from "@/types/company";
import { getRandomColor } from "@/utils";
import ActionButton from "../buttons/ActionButton";
import { COLORS, FONTS } from "@/constants/theme";

interface UserCardProps {
  user: CompanyUser;
  onEdit: () => void;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  if (!user) return;
  const calculateAge = (birthDate?: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getRoleBadgeColor = (role: CompanyUserRoles) => {
    switch (role) {
      case "Representative":
        return "#007BFF"; // Blue
      case "Support":
        return "#28A745"; // Green
      case "TourGuide":
        return "#FFC107"; // Yellow
      default:
        return "#6C757D"; // Gray
    }
  };

  const roleBadgeColor = getRoleBadgeColor(user?.role as CompanyUserRoles);
  console.log({ user });
  const roleInitial = user?.role && user?.role?.charAt(0).toUpperCase(); // First letter of the role

  return (
    <View style={styles.card}>
      <View style={styles.profileRow}>
        {user?.profile_picture ? (
          <Image source={{ uri: user?.profile_picture }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.initialsContainer,
              { backgroundColor: getRandomColor() },
            ]}
          >
            <Text style={styles.initials}>
              {getInitials(user?.first_name || "", user?.last_name || "")}
            </Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text
            style={styles.name}
          >{`${user?.first_name} ${user?.last_name}`}</Text>
          <Text style={styles.details}>{user?.email}</Text>
          <Text style={styles.details}>{user?.phone}</Text>
        </View>
      </View>
      <View style={[styles.roleBadge, { backgroundColor: roleBadgeColor }]}>
        <Text style={styles.roleText}>{roleInitial}</Text>
      </View>
      {calculateAge(user?.birth_date) !== 0 && (
        <Text style={styles.age}>
          Age: {calculateAge(user?.birth_date)} years
        </Text>
      )}
      <View style={styles.buttonContainer}>
        {user?.role !== "Representative" && (
          <ActionButton
            style={{ flex: 1 }}
            text="Delete"
            onPress={() => onDelete(user?.id as string)}
            variant="action"
            textColor="red"
          />
        )}
        <ActionButton
          style={{ flex: 1 }}
          text="Edit"
          onPress={onEdit}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    position: "relative",
    borderRadius: 8,
    backgroundColor: COLORS.bg,
    elevation: 4, // Use elevation for Android shadow
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
    overflow: "hidden",
    marginBottom: 10, // Add some spacing between cards
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    columnGap: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  initialsContainer: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  initials: {
    fontSize: FONTS.small,
    fontWeight: "500",
    color: "white",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.normal,
    letterSpacing: 1,
    color: COLORS.textPrimary,
  },
  details: {
    fontSize: FONTS.small,
    letterSpacing: 0.5,
    color: COLORS.textSecondary,
  },
  roleBadge: {
    position: "absolute",
    top: -5,
    right: -40,
    width: 100,
    height: 30,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "45deg" }], // Adjusted rotation
  },
  roleText: {
    color: "white",
    fontWeight: "bold",
    transform: [{ rotate: "-45deg" }], // Rotate the text to be upright
  },
  age: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    flex: 1,
  },
});

export default UserCard;
