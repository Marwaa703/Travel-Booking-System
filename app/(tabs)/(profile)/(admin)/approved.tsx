import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "@/constants/theme";
import Header from "@/components/core/Header";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Company } from "@/types/company";
import { editCompany, removeCompany } from "@/redux/slices/companiesSlice";
import { router } from "expo-router";
import { updateCompanyDetails } from "@/redux/actions/companiesActions";

const ApprovedCompaniesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const approvedCompanies = useAppSelector((state) =>
    state.companies.companies.filter((c: Company) => c.approved),
  ) as Company[];
  console.log({ approvedCompanies });

  // const [companies, setCompanies] = useState<Company[]>(companiesData.companies);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ name: string; address: string }>({
    name: "",
    address: "",
  });

  const deleteCompany = (companyId: string) => {
    dispatch(removeCompany(companyId));
  };
  const updateCompany = (companyId: string) => {
    if (!editData.name && !editData.address) {
      Alert.alert("Please enter valid data");
      return;
    }
    dispatch(
      editCompany({
        id: companyId,
        name: editData.name,
        address: editData.address,
      }),
    );
    setSelectedCompany(null);
    setEditData({ name: "", address: "" });
  };
  const handleUpdateCompany = (c: Company) => {
    // update server
    dispatch(
      updateCompanyDetails({
        ...c,
        approved: true,
        admin_msg: "Congratulations! your company has been approved",
        status: "approved",
      }),
    )
      .then(() => {
        setSelectedCompany(null);
        setEditData({ name: "", address: "" });
      })
      .catch((e) => console.log({ e }));
  };
  return (
    <>
      <Header
        title={"Approved Companies"}
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Manage Companies</Text>
        {/* List of Companies */}
        <FlatList
          data={approvedCompanies}
          keyExtractor={(item) => item.id as string}
          renderItem={({ item }) => (
            <View style={styles.companyContainer}>
              <View style={styles.companyStaticContainer}>
                <Image
                  source={{ uri: item.logo }}
                  style={styles.companyImage}
                />
                <View style={styles.companyDetails}>
                  <View style={styles.companyHeader}>
                    <Text style={styles.companyId}>{item.name}</Text>
                    <View style={styles.iconGroup}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedCompany(item.id as string);
                          setEditData({
                            name: item.name,
                            address: item.address,
                          });
                        }}
                      >
                        <Ionicons
                          name="pencil-outline"
                          size={20}
                          color={COLORS.link}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteCompany(item.name)}
                        style={styles.iconButton}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={20}
                          color={COLORS.error}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.companySubtitle}>{item.address}</Text>
                  <Text>Rating: {0}</Text>
                  <Text>Trips: {0}</Text>
                </View>
              </View>
              <View>
                {selectedCompany === item.id && (
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Enter title"
                      value={editData.name}
                      onChangeText={(text) =>
                        setEditData((prev) => ({ ...prev, name: text }))
                      }
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Enter subtitle"
                      value={editData.address}
                      onChangeText={(text) =>
                        setEditData((prev) => ({ ...prev, address: text }))
                      }
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={() => handleUpdateCompany(item)}
                      style={styles.iconButton}
                    >
                      <Ionicons
                        name="checkmark"
                        size={24}
                        color={COLORS.success}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default ApprovedCompaniesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  companyContainer: {
    flexDirection: "column",
    // flexDirection: "row",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  companyStaticContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  companyImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 8,
  },
  companyDetails: {
    flex: 1,
    justifyContent: "center",
  },
  companyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  companyId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconGroup: {
    flexDirection: "row",
  },
  companySubtitle: {
    fontSize: 14,
    color: COLORS.textSubtitle,
    marginBottom: 5,
  },
  inputContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textPrimary,
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
    flex: 1,
  },
  iconButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
});
