import React, { Fragment, useState } from "react";
import Button from "../Buttons";
import { CompanyPaper } from "@/types/company";
import Spacer from "../Spacer";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputField from "./TextInputField";

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
  const [papers, setPapers] = useState<CompanyPaper[]>([]);
  const [paper, setPaper] = useState<CompanyPaper>({
    title: "",
    image_url: "",
  });

  const handlePapersSubmit = () => {
    onSubmit(papers);
  };
  const handleAddImage = () => {
    if (paper.title && paper.image_url) {
      // inject companyId from currentCompanyUser SignedIn
      setPapers((pre) => [...pre, paper]);
      setPaper({ title: "", image_url: "" });
    } else alert("Can't add empty values");
  };

  const handleDeletePaper = (index: number) => {
    setPapers(papers.filter((_, i) => i !== index));
  };
  return (
    <>
      <Fragment>
        <TextInputField
          trim={false}
          name={"caption"}
          onChangeText={(title) => setPaper((pre) => ({ ...pre, title }))}
          icon="logo-closed-captioning"
          onBlur={undefined}
          value={paper.title}
        />
        <TextInputField
          name={"image"}
          onChangeText={(imageUrl) =>
            setPaper((pre) => ({ ...pre, image_url: imageUrl }))
          }
          icon="image-outline"
          onBlur={undefined}
          value={paper.image_url}
          trim={false}
        />
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
                    papers.map((paper, i) =>
                      i === index ? { ...paper, image_url: "" } : paper,
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
      <Button
        title="Submit"
        onPress={handlePapersSubmit}
        loadingMessage={msg}
        loading={loading}
      />
    </>
  );
};

export default CompanyPapersForm;
const styles = StyleSheet.create({
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
