import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CompanyUser, CompanyUserRoles } from "@/types/company";
import { getRandomColor } from "@/utils";
import ActionButton from "../buttons/ActionButton";

interface UserCardProps {
  user: CompanyUser;
  onEdit: () => void;
  onDelete: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
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

  const roleBadgeColor = getRoleBadgeColor(user.role);
  const roleInitial = user.role.charAt(0).toUpperCase(); // First letter of the role

  return (
    <View style={styles.card}>
      <View style={styles.profileRow}>
        {user.profile_picture ? (
          <Image source={{ uri: user.profile_picture }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.initialsContainer,
              { backgroundColor: getRandomColor() },
            ]}
          >
            <Text style={styles.initials}>
              {getInitials(user.first_name, user.last_name)}
            </Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text
            style={styles.name}
          >{`${user.first_name} ${user.last_name}`}</Text>
          <Text style={styles.details}>{user.email}</Text>
          <Text style={styles.details}>{user.phone}</Text>
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
        <ActionButton text="Edit" onPress={onEdit} variant="primary" />
        <ActionButton
          text="Delete"
          onPress={() => onDelete(user.id as string)}
          variant="action"
          textColor="red"
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
    elevation: 1,
    overflow: "hidden",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  initials: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#666",
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
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default UserCard;
