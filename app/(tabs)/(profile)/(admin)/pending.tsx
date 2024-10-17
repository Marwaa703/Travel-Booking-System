import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS } from "@/constants/theme";
import Header from "@/components/core/Header";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Company, CompanyPaper } from "@/types/company";
import { updateCompanyDetails } from "@/redux/actions/companiesActions";
import Spacer from "@/components/Spacer";
import papersApi from "@/api/companyPapers";
import { hashTextPercent } from "@/utils";
import FullScreenImage from "@/components/FullScreenImage";
import { router } from "expo-router";

const Pending = () => {
  const dispatch = useAppDispatch();
  const pendingCompanies = useAppSelector((state) =>
    state.companies.companies.filter((c) => !c.approved),
  );
  console.log({ pendingCompanies });
  const [papers, setPapers] = useState<CompanyPaper[]>([]);
  const [companies, setCompanies] = useState(pendingCompanies);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleApprove = (c: Company) => {
    // update server
    dispatch(updateCompanyDetails({ ...c, approved: true }));
    // console.log(`Company with ID ${company.name} approved!`);

    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== c.id),
    );
  };

  const handleDeny = (companyId: string) => {
    // alert user to update the company information
    // delete company papers from database
    console.log(`Company with ID ${companyId} denied!`);
  };

  const getCompanyPapers = async (id: string) => {
    try {
      const res = await papersApi.getCompanyPapers(id);
      if (res) {
        setPapers(res);
      }
    } catch (error) {
      console.log({ error });
    } finally {
    }
  };

  const handleImagePress = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };
  console.log(companies[0]);
  return (
    <>
      <Header
        title={`Pending Requests ${pendingCompanies.length}`}
        leftIcon="arrow-back"
        onLeftIconPress={() => router.back()}
      />

      <ScrollView style={styles.container}>
        {!companies.length && <Text>No pending companies!</Text>}
        {companies &&
          companies.map((company) => (
            <View key={company.id} style={styles.card}>
              <View style={styles.row}>
                <Image source={{ uri: company.logo }} style={styles.logo} />
                <View>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.detail}>{company.address}</Text>
                </View>
              </View>
              {/* <Text style={styles.detail}>Required Papers: {company.papers}</Text> */}

              <Text style={styles.detail}>
                {hashTextPercent(company?.wallet as string, "#")}
              </Text>
              <Pressable onPress={() => getCompanyPapers(company.id as string)}>
                <Text style={{ color: COLORS.accent }}>Get Papers</Text>
              </Pressable>
              {papers && papers[0]?.company_id == company?.id && (
                <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {papers.map((paper) => (
                      <View key={paper.paper_id} style={styles.paperItem}>
                        <Text style={styles.paperTitle}>{paper.title}</Text>
                        <TouchableOpacity
                          onPress={() => handleImagePress(paper.image_url)}
                        >
                          <Image
                            source={{ uri: paper.image_url }}
                            style={styles.paperImage}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                  <FullScreenImage
                    visible={isModalVisible}
                    imageUrl={selectedImage || ""}
                    onClose={() => setModalVisible(false)}
                  />
                </View>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => handleApprove(company)}
                >
                  <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.denyButton}
                  onPress={() => handleDeny(company.id as string)}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
              <Spacer />
            </View>
          ))}
      </ScrollView>
    </>
  );
};

// Styles for the Pending component
const styles = StyleSheet.create({
  container: {
    marginBottom: 90,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    columnGap: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
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
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  detail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginVertical: 2,
  },

  paperItem: {
    marginRight: 10,
    alignItems: "center",
  },
  paperTitle: {
    position: "absolute",
    fontSize: FONTS.small,
    color: COLORS.light,
    marginBottom: 5,
    zIndex: 4,
    backgroundColor: "rgba(22,22,22,0.5)",
    width: "100%",
    textAlign: "center",
  },
  paperImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  denyButton: {
    backgroundColor: COLORS.error,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Pending;
