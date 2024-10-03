/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "@/constants/theme";
import Header from "@/components/core/Header";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Company } from "@/types/company";
import { approveCompany } from "@/redux/slices/companiesSlice";

// Dummy data for pending companies
// const pendingCompanies = [
//   {
//     id: 1,
//     name: "Company A",
//     logo: "data:image/jpeg;base64,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", 
//     physicalAddress: "Cairo",
//     walletAddress: "0x1234567890abcdef",
//     papers: "Business License, Tax ID",
//   },
//   {
//     id: 2,
//     name: "Company B",
//     logo: "data:image/png;base64,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",
//     physicalAddress: "Giza",
//     walletAddress: "0xabcdef1234567890",
//     papers: "Business License, Tax ID",
//   },
//   {
//     id: 3,
//     name: "Company c",
//     logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9K5nE9Mo13CM_2xY0E_mQumM7UE1PehbhNYWCK7H75M4bQoWjfURfe6WCw&s",
//     physicalAddress: "Aswan",
//     walletAddress: "0xabcdef1234567890",
//     papers: "Business License, Tax ID",
//   },
// ];


const Pending = () => {

const dispatch = useAppDispatch();
  const pendingCompanies = useAppSelector(state=>state.companies.companies.filter((c:Company)=>!c.approved)) as Company[];
console.log({pendingCompanies})
const handleApprove = (companyId: string) => {
// update server
dispatch(approveCompany(companyId))
    console.log(`Company with ID ${companyId} approved!`);
  };

  const handleDeny = (companyId: string) => {
    // alert user to update the company information
    // delete company papers from database
    console.log(`Company with ID ${companyId} denied!`);
  };

  return (
    <>
    <Header title={"Pending Requests"}/>
    <ScrollView style={styles.container}>
      {pendingCompanies.map((company) => (
        <View key={company.id} style={styles.card}>
          <Image source={{ uri: company.logo }} style={styles.logo} />
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.detailsTitle}>Details:</Text>
          <Text style={styles.detail}>Physical Address: {company.address}</Text>
          <Text style={styles.detail}>Wallet Address: {company.wallet}</Text>
          {/* <Text style={styles.detail}>Required Papers: {company.papers}</Text> */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => handleApprove(company.id as string)}
            >
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.denyButton}
              onPress={() => handleDeny(company.id as string)}
            >
              <Text style={styles.buttonText}>Deny</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
    </>
  );
};

// Styles for the Pending component
const styles = StyleSheet.create({
  container:{
marginBottom:90
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, 
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  denyButton: {
    backgroundColor: COLORS.error,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Pending;
