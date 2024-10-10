import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/core/Header";
import { COLORS } from "@/constants/theme";

interface User {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  gender: string;
  phone: string;
}

const RegisterUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "User",
      email: "user1@user.com",
      birthdate: "1990-01-01",
      gender: "Male",
      phone: "123-456-7890",
    },
    {
      id: "2",
      name: "User Two",
      email: "user2@user.com",
      birthdate: "1985-05-15",
      gender: "Female",
      phone: "987-654-3210",
    },
    {
      id: "3",
      name: "User Three",
      email: "user3@user.com",
      birthdate: "1999-09-20",
      gender: "Male",
      phone: "456-654-3210",
    },
  ]);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [editUser, setEditUser] = useState<string | null>(null);

  // Update user
  const updateUser = () => {
    setUsers(
      users.map((user) =>
        user.id === editUser
          ? { ...user, name, email, birthdate, gender, phone }
          : user,
      ),
    );
    resetForm();
  };

  // Delete user
  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Reset the form
  const resetForm = () => {
    setEditUser(null);
    setName("");
    setEmail("");
    setBirthdate("");
    setGender("");
    setPhone("");
  };

  return (
    <>
      <Header title="Register Users" />
      <View style={styles.container}>
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
                        placeholder="Enter user name"
                        value={name}
                        onChangeText={setName}
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
                        value={birthdate}
                        onChangeText={setBirthdate}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Enter gender"
                        value={gender}
                        onChangeText={setGender}
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
                        <Text style={styles.updateButtonText}>Update User</Text>
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
                    <Text style={styles.userName}>Name: {user.name}</Text>
                    <Text style={styles.userDetails}>Email: {user.email}</Text>
                    <Text style={styles.userDetails}>
                      Birthdate: {user.birthdate}
                    </Text>
                    <Text style={styles.userDetails}>
                      Gender: {user.gender}
                    </Text>
                    <Text style={styles.userDetails}>Phone: {user.phone}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => {
                        setEditUser(user.id);
                        setName(user.name);
                        setEmail(user.email);
                        setBirthdate(user.birthdate);
                        setGender(user.gender);
                        setPhone(user.phone);
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
      </View>
    </>
  );
};

export default RegisterUsersScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 190,
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
