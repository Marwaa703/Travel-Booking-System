/* eslint-disable react-native/no-unused-styles */
import React, { Fragment, useState } from "react";
import Button from "../Buttons";
import { CompanyPaper } from "@/types/company";
import Spacer from "../Spacer";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputField from "./TextInputField";
import TextNote from "./TextNote";
import Toast from "react-native-toast-message";
import { imageUrlPattern } from "@/constants/regext";
import TermsAndConditions from "../admin/TermsAndConditions";
import { ColorPalette } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface CompanyPapersFormProps {
  onSubmit: (data: CompanyPaper[]) => void;
  loading?: boolean;
  msg?: string;
}

const CompanyPapersForm: React.FC<CompanyPapersFormProps> = ({
  onSubmit,
  loading,
  msg,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const [agreed, setAgreed] = useState(false);

  const [papers, setPapers] = useState<CompanyPaper[]>([]);
  const [paper, setPaper] = useState<CompanyPaper>({
    title: "",
    image_url: "",
  });

  const handlePapersSubmit = () => {
    if (papers.length >= 2) onSubmit(papers);
    else
      Toast.show({
        text1: "Invalid number of Papers",
        text2: "Must add at leat 2 of the company papers?",
        type: "error",
      });
  };

  const handleAddImage = () => {
    if (paper.title && paper.image_url) {
      if (imageUrlPattern.test(paper.image_url)) {
        // inject companyId from currentCompanyUser SignedIn
        setPapers((prev) => [...prev, paper]);
        setPaper({ title: "", image_url: "" });
      } else {
        Toast.show({
          text1: "Invalid Image URL",
          text2: "Image URL must end with .jpg, .jpeg, or .png",
          type: "error",
        });
      }
    } else {
      Toast.show({
        text1: "Empty Fields",
        text2: "Can't add empty values",
        type: "error",
      });
    }
  };

  const handleDeletePaper = (index: number) => {
    setPapers(papers.filter((_, i) => i !== index));
  };

  return (
    <>
      <Fragment>
        <TextNote note="Provide tax papers, and commercial register!" />
        <Spacer />
        <TextInputField
          trim={false}
          name={"paper Name"}
          onChangeText={(title) => setPaper((prev) => ({ ...prev, title }))}
          icon="logo-closed-captioning"
          onBlur={undefined}
          value={paper.title}
        />
        <Spacer />
        <TextInputField
          name={"image"}
          onChangeText={(imageUrl) =>
            setPaper((prev) => ({ ...prev, image_url: imageUrl }))
          }
          icon="image-outline"
          onBlur={undefined}
          value={paper.image_url}
          trim={false}
        />
        <TextNote note="Support Image links ending with .jpg, .jpeg, or .png!" />
        <Spacer />
        <TouchableOpacity onPress={handleAddImage} style={styles.addButton}>
          <Text>+</Text>
        </TouchableOpacity>
        <Spacer />
        {papers.map((paper, index) => (
          <View key={index} style={styles.addedLocationRow}>
            {paper.image_url ? (
              <Image
                source={{ uri: paper.image_url }}
                style={styles.locationImage}
                onError={() =>
                  setPapers(
                    papers.map((p, i) =>
                      i === index ? { ...p, image_url: "" } : p,
                    ),
                  )
                }
              />
            ) : null}
            <Text style={styles.locationName}>
              {paper.title.substring(0, 30)}
              {paper.title.length >= 30 ? "..." : ""}
            </Text>
            <TouchableOpacity onPress={() => handleDeletePaper(index)}>
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Spacer />
      </Fragment>
      <Spacer />
      <TermsAndConditions onAgree={(checked) => setAgreed(checked)} />

      <Button
        title="Submit"
        onPress={handlePapersSubmit}
        loadingMessage={msg}
        loading={loading}
        disabled={!agreed}
      />
      <Toast />
    </>
  );
};

export default CompanyPapersForm;

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    addButton: {
      justifyContent: "center",
      alignItems: "center",
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#e0e0e0",
      marginHorizontal: "auto",
    },
    addedLocationRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      paddingBottom: 8,
    },
    locationImage: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 8,
    },
    locationName: {
      flex: 1,
      marginLeft: 8,
      maxWidth: 100,
    },
    deleteButton: {
      marginLeft: 8,
    },
  });
