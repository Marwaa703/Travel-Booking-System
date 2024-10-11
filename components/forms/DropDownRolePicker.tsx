import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import FieldErrorMessage from "./FieldErrorMessage"; // Assuming you have a FieldErrorMessage component
import { CompanyUserRoles } from "@/types/company";
import { COLORS, FONTS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface DropdownProps {
  items: CompanyUserRoles[];
  onSelect: (item: CompanyUserRoles) => void;
  name: string;
  error?: string;
  value?: string;
  icon?: string; // Icon as a string (URL or asset)
}

const DropdownRolePicker: React.FC<DropdownProps> = ({
  items,
  onSelect,
  name,
  value,
  error,
  icon,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (value) setSelectedValue(value);
  }, [value]);

  const handleSelect = (item: CompanyUserRoles) => {
    setSelectedValue(item);
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.roleContainer}>
        <Text style={styles.label}>
          {name.slice(0, 1).toLocaleUpperCase() + name.slice(1)}
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.selectorButton}
        >
          <Text style={styles.selectorText}>
            {selectedValue || `Select ${name}`}
          </Text>
          {icon && (
            <Ionicons
              name={icon as never}
              size={20}
              color={COLORS.textSecondary}
            />
          )}
        </TouchableOpacity>
      </View>
      <FieldErrorMessage error={error as string} />
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginLeft: 14,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: FONTS.normal,
    color: COLORS.textSubtitle,
    flex: 1, // Allow label to take available space
  },
  selectorButton: {
    alignItems: "center",
    backgroundColor: COLORS.light,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 2, // Allow button to take more space
  },
  selectorText: {
    fontSize: FONTS.normal,
    color: "#666",
    flex: 1, // Allow text to take available space
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  item: {
    padding: 15,
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DropdownRolePicker;
