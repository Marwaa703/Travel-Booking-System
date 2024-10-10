import papersApi from "@/api/companyPapers";
import Button from "@/components/Buttons";
import ScreenWraper from "@/components/containers/ScreenWraper";
import useLoadingState from "@/hooks/useLoadingSate";
import { selectCompanyById } from "@/redux/slices/companiesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Company, CompanyPaper, CompanyUser } from "@/types/company";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const CompanyProfileScreen = () => {
  const [papers, setPapers] = useState<CompanyPaper[]>([]);
  const { loading, msg, setLoading, setMsg } = useLoadingState();

  const dispatch = useAppDispatch();
  const [showPapers, setShowPapers] = useState(false);
  const auth: CompanyUser = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as CompanyUser;
  const company: Company = useAppSelector((state) =>
    selectCompanyById(state, auth.company_id as string),
  ) as Company; // Adjust selector according to your state management

  // This function could fetch or clear the data as needed

  //   console.log({ id: company.id });
  const getCompanyPapers = async () => {
    console.log("start getting papers");
    setLoading(true);
    setMsg("getting company papers");

    try {
      const res = await papersApi.getCompanyPapers(company.id as string);
      setPapers(res);
      console.log({ res });
    } catch (error) {
      setLoading(false);
      console.log({ error });
    } finally {
      setMsg("");
      setLoading(false);
    }
  };
  console.log({ company });

  return (
    <ScrollView style={styles.container}>
      <ScreenWraper>
        <View style={styles.header}>
          <Image source={{ uri: company.logo }} style={styles.logo} />
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.address}>{company.address}</Text>
          <Text style={styles.approvalStatus}>
            {company.approved ? "Approved" : "Pending Approval"}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.sectionTitle}>Company Details</Text>
          <Text style={styles.detailText}>
            Wallet: {company.wallet || "N/A"}
          </Text>
        </View>

        <Button
          title={"Get company papers"}
          onPress={getCompanyPapers}
          loading={loading}
          loadingMessage={msg}
        />

        {papers?.length > 0 && (
          <View style={styles.papersSection}>
            <Text style={styles.sectionTitle}>Company Papers</Text>
            {papers.map((paper) => (
              <View key={paper.paper_id} style={styles.paperItem}>
                <Text style={styles.paperTitle}>{paper.title}</Text>
                <Image
                  source={{ uri: paper.image_url }}
                  style={styles.paperImage}
                />
              </View>
            ))}
          </View>
        )}
      </ScreenWraper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  address: {
    fontSize: 16,
    color: "#666",
  },
  approvalStatus: {
    fontSize: 14,
    color: "#007BFF",
  },
  details: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
  },
  papersSection: {
    marginTop: 20,
  },
  paperItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  paperImage: {
    width: 250,
    height: 250,
    borderRadius: 5,
    marginRight: 10,
  },
  paperTitle: {
    fontSize: 16,
    flex: 1,
  },
});

export default CompanyProfileScreen;
