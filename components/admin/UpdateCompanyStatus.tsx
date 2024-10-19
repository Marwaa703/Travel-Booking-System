/* eslint-disable react-native/no-unused-styles */
import { ColorPalette, COLORS } from "@/constants/theme";
import {
  Company,
  companyApproveStatus,
  CompanyApproveStatus,
  CompanyEditSection,
  companyEditSections,
} from "@/types/company";
import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import TextInputField from "../forms/TextInputField";
import ToggleSwitch from "../forms/FullToggleSwitch";
import Spacer from "../Spacer";
import Label from "../forms/Label";
import ActionButton from "../buttons/ActionButton";
import { useAppDispatch } from "@/redux/store";
import { updateCompanyDetails } from "@/redux/actions/companiesActions";
import { useTheme } from "@/hooks/useTheme";

interface UpdateCompanyStatusProps {
  visible: boolean;
  onClose: () => void;
  onApprove: (companyId: string) => void;
  company: Company; // Adjust this type according to your company object structure
}

const UpdateCompanyStatus: React.FC<UpdateCompanyStatusProps> = ({
  visible,
  onClose,
  onApprove,
  company,
}) => {
  // configure styles
  const theme = useTheme();
  const styles = stylesObj(theme);
  const dispatch = useAppDispatch();

  const [section, setSection] = useState<CompanyEditSection | undefined>();
  const [status, setStatus] = useState<CompanyApproveStatus | undefined>(
    company.status || "pending",
  );
  const [adminMsg, setAdminMsg] = useState("");
  const handleUpdate = () => {
    const constructedAdminMsg = `${section}&${adminMsg}`;
    const updatedCompany: Partial<Company> = {
      ...company,
      status,
      admin_msg: constructedAdminMsg,
    }; // Update company status

    if (section === "Details") {
      dispatch(updateCompanyDetails(updatedCompany));
    } else if (section === undefined) {
      dispatch(
        updateCompanyDetails({
          ...company,
          approved: true,
          admin_msg: adminMsg,
          status: "approved",
        }),
      );
    }
    onApprove(company.id as string);
    onClose(); // Close the modal after updating
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Update '{company.name}' Status</Text>
          <Spacer />
          <Label text="Select which section need to be updated?" />
          <Spacer />
          <ToggleSwitch
            options={companyEditSections as CompanyEditSection[]}
            onToggle={(value: CompanyEditSection) => setSection(value)}
            selectedOption={section as CompanyEditSection}
          />
          <Spacer />
          <Label text="Message for new status!" />
          <Spacer height={4} />
          <TextInputField
            name="Admin msg"
            onBlur={undefined}
            placeholder="write message for the new status "
            value={adminMsg}
            onChangeText={setAdminMsg}
            trim={false}
          />
          <Spacer />
          <Label text="New company status!" />
          <Spacer height={4} />
          <ToggleSwitch
            options={companyApproveStatus}
            onToggle={(value: CompanyApproveStatus) => setStatus(value)}
            selectedOption={company.status as CompanyApproveStatus}
          />
          <Spacer />
          <Spacer />

          <View style={styles.buttonContainer}>
            <ActionButton
              variant="primary"
              // style={{ backgroundColor: COLORS.accent }}
              onPress={handleUpdate}
              text="Update Company Status"
              style={{
                backgroundColor: COLORS.accent,
                width: "50%",
                paddingVertical: 10,
                borderRadius: 2,
              }}
            />
            <ActionButton
              variant="action"
              onPress={onClose}
              text="Cancel"
              textColor="black"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const stylesObj = (COLORS: ColorPalette) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: COLORS.bg,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      height: "60%",
      backgroundColor: COLORS.bg_surface,
      borderRadius: 10,
      margin: 10,
      padding: 10,
      elevation: 5,
      justifyContent: "space-between",
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

export default UpdateCompanyStatus;
