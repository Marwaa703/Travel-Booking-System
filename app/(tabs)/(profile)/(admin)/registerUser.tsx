import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "@/components/core/Header";
import { COLORS } from "@/constants/theme";
import userApi from "@/api/userApi";
import { User } from "@/types/user";
import { UserTypes } from "@/types/user";
import Alert from "@/components/core/Alert";
import { router } from "expo-router";

const RegisterUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<UserTypes | string>("user");
  const [editUser, setEditUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await userApi.getAllUsers();
        const filteredUsers = fetchedUsers.filter(
          (user) => user.role === "User",
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Update user
  const updateUser = async () => {
    if (editUser) {
      try {
        const updatedUser = await userApi.updateUser(editUser, {
          first_name: firstName,
          last_name: lastName,
          email,
          birth_date: birthDate,
          phone,
          role,
        });

        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === editUser ? updatedUser : user)),
        );
        resetForm();
      } catch (error) {
        console.error("Error updating user:", error);
        setError("Failed to update user. Please try again.");
      }
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    try {
      await userApi.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
    }
  };

  const resetForm = () => {
    setEditUser(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthDate("");
    setPhone("");
    setRole("user");
  };

  return (
    <>
      <Header
        title="Register Users"
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.secondary}
            style={styles.loader}
          />
        ) : (
          <>
            {error && <Alert message={error} type="error" />}
            <FlatList
              data={[{ key: "form" }, ...users]}
              keyExtractor={(item) => (item as any).id || item.key}
              renderItem={({ item }) => {
                if ((item as any).key === "form") {
                  return (
                    <View style={styles.formContainer}>
                      <Text style={styles.title}>Manage Users</Text>
                      {editUser && (
                        <>
                          <TextInput
                            placeholder="Enter first name"
                            value={firstName}
                            onChangeText={setFirstName}
                            style={styles.input}
                          />
                          <TextInput
                            placeholder="Enter last name"
                            value={lastName}
                            onChangeText={setLastName}
                            style={styles.input}
                          />
                          <TextInput
                            placeholder="Enter email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                          />
                          <TextInput
                            placeholder="Enter birthdate (YYYY-MM-DD)"
                            value={birthDate}
                            onChangeText={setBirthDate}
                            style={styles.input}
                          />
                          <TextInput
                            placeholder="Enter phone"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.input}
                          />
                          <TouchableOpacity
                            style={styles.updateButton}
                            onPress={updateUser}
                          >
                            <Text style={styles.updateButtonText}>
                              Update User
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  );
                } else {
                  const user = item as User;
                  return (
                    <View style={styles.userContainer}>
                      <View>
                        <Text style={styles.userName}>
                          Name: {user.first_name} {user.last_name}
                        </Text>
                        <Text style={styles.userDetails}>
                          Email: {user.email}
                        </Text>
                        <Text style={styles.userDetails}>
                          Birthdate: {user.birth_date?.toString().split("T")[0]}{" "}
                        </Text>
                        <Text style={styles.userDetails}>
                          Phone: {user.phone}
                        </Text>
                        <Text style={styles.userDetails}>
                          Role: {user.role}
                        </Text>
                      </View>
                      <View style={styles.actionButtons}>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => {
                            setEditUser(user.id);
                            setFirstName(user.first_name);
                            setLastName(user.last_name);
                            setEmail(user.email);
                            setBirthDate(
                              user.birth_date?.toString().split("T")[0] || "",
                            );
                            setPhone(user.phone);
                            setRole(user.role);
                          }}
                        >
                          <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => deleteUser(user.id)}
                        >
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
              }}
            />
          </>
        )}
      </View>
    </>
  );
};

export default RegisterUsersScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 190,
  },
  loader: {
    marginTop: 20,
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  updateButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  userDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
