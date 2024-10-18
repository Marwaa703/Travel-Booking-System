import { COLORS, FONTS } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface TermsAndConditionsProps {
  onAgree: (isChecked: boolean) => void; // Prop function to pass checkbox state
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onAgree }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const openModal = () => setModalVisible(true);

  const agreeAndCloseModal = () => {
    setIsChecked(true);
    setModalVisible(false);
    onAgree(true); // Call prop function with true
  };
  useEffect(() => {
    onAgree(isChecked);
  }, [isChecked, onAgree]);

  return (
    <View style={styles.container}>
      <View style={styles.termsContainer}>
        <TouchableOpacity
          onPress={() => setIsChecked(!isChecked)}
          style={styles.checkboxContainer}
        >
          <View
            style={[styles.checkbox, isChecked && styles.checkboxChecked]}
          />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Read and agree to{" "}
          <Text style={styles.linkText} onPress={openModal}>
            Terms and Conditions
          </Text>{" "}
          before signup?
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close without checking the checkbox
      >
        <View style={styles.fullScreenModal}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <Text style={styles.header}>
                Terms & Conditions: Voyage Platform
              </Text>
              <Text style={styles.text}>
                Welcome to Voyage! By downloading, accessing, or using our
                mobile application, you agree to comply with and be bound by
                these Terms and Conditions. Please read them carefully before
                using the app. If you do not agree to these terms, please
                refrain from using our services.
              </Text>

              <Text style={styles.sectionHeader}>1. Acceptance of Terms</Text>
              <Text style={styles.text}>
                By using the Voyage platform, both users travelers and companies
                agree to these Terms and Conditions, along with our Privacy
                Policy. These terms govern the use of our app and services,
                including access to verified tour listings, bookings, payments,
                and any other features provided by Voyage.
              </Text>

              <Text style={styles.sectionHeader}>
                2. User Registration and Verification
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Users:</Text>
                {"\n"}• To access certain features of the platform, such as
                booking tours, you must create an account and provide accurate,
                up-to-date information. You agree that the information provided
                is truthful and complete. Voyage reserves the right to verify
                user information to maintain the platform's integrity.
                {"\n"}
                <Text style={styles.boldText}>Companies:</Text>
                {"\n"}• Travel companies must provide accurate information about
                their business, including business registration documents,
                licenses, and contact details. Voyage conducts a verification
                process before allowing companies to list tours on the platform.
                Any false or misleading information may result in suspension or
                termination of access.
              </Text>

              <Text style={styles.sectionHeader}>
                3. Service Use and Restrictions
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Users:</Text>
                {"\n"}• Voyage is a platform for finding and booking tours
                provided by verified travel companies. Users agree to use the
                platform responsibly, including maintaining the security of
                their accounts and refraining from unauthorized activities such
                as data scraping or creating multiple accounts.
                {"\n"}
                <Text style={styles.boldText}>Companies:</Text>
                {"\n"}• Travel companies are responsible for maintaining
                accurate tour listings, pricing, and availability. They must
                promptly update any changes to tour details and ensure the
                quality of the services offered. Unauthorized use of the
                platform or violations of these terms may result in removal from
                the platform.
              </Text>

              <Text style={styles.sectionHeader}>
                4. Booking and Payment Terms
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Users:</Text>
                {"\n"}• When booking a tour, ensure that you review all details,
                including itineraries, prices, and cancellation policies. Voyage
                does not assume responsibility for disputes arising from
                services provided by travel companies but will facilitate
                communication to resolve issues.
                {"\n"}
                <Text style={styles.boldText}>Companies:</Text>
                {"\n"}• All payments made through Voyage are subject to
                verification processes. Travel companies agree to honor bookings
                made through the platform and adhere to any cancellation or
                refund policies set forth. Companies are responsible for
                providing clear terms for each tour.
              </Text>

              <Text style={styles.sectionHeader}>
                5. Data Integrity and Verification
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Users:</Text>
                {"\n"}• Voyage strives to provide accurate information on tours
                and companies. However, we do not guarantee the completeness or
                accuracy of all content. Users are encouraged to report any
                discrepancies.
                {"\n"}
                <Text style={styles.boldText}>Companies:</Text>
                {"\n"}• Companies must ensure that all content they publish,
                including tour descriptions and images, is accurate and not
                misleading. Misleading information or failure to maintain data
                integrity may result in penalties or removal from the platform.
              </Text>

              <Text style={styles.sectionHeader}>
                6. Limitation of Liability
              </Text>
              <Text style={styles.text}>
                Voyage is not liable for any direct, indirect, incidental, or
                consequential damages arising from the use or inability to use
                the platform, including booking cancellations, payment disputes,
                or inaccuracies in tour listings. Both users and companies
                assume full responsibility for their interactions through the
                platform.
              </Text>

              <Text style={styles.sectionHeader}>
                7. Termination and Suspension
              </Text>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Users:</Text>
                {"\n"}• Voyage reserves the right to suspend or terminate access
                to users who violate these Terms and Conditions or engage in
                fraudulent activities.
                {"\n"}
                <Text style={styles.boldText}>Companies:</Text>
                {"\n"}• Companies found in violation of these terms, engaging in
                fraudulent practices, or providing misleading information may
                have their accounts suspended or terminated without prior
                notice.
              </Text>

              <Text style={styles.sectionHeader}>8. Changes to Terms</Text>
              <Text style={styles.text}>
                Voyage reserves the right to update these Terms and Conditions
                at any time. Users and travel companies will be notified of
                significant changes through the app or via email. Continued use
                of the platform after changes indicates acceptance of the
                revised terms.
              </Text>

              <Text style={styles.conclusionText}>
                By using Voyage, you agree to abide by these Terms and
                Conditions, ensuring a trusted and seamless experience for all
                users and travel companies.
              </Text>
            </ScrollView>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={agreeAndCloseModal}
              style={styles.agreeButton}
            >
              <Text style={styles.agreeButtonText}>Agree</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.bg,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxContainer: {
    marginRight: 10,
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  checkbox: {
    width: 16,
    height: 16,
    backgroundColor: "transparent",
    borderRadius: 3,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  termsText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.small,
  },
  fullScreenModal: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.bg,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "500",
    margin: 20,
    textAlign: "center",
    letterSpacing: 2,
    color: COLORS.textPrimary,
  },
  sectionHeader: {
    fontSize: 18,
    // fontWeight: "bold",
    marginVertical: 10,
    color: COLORS.textPrimary,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: "justify",
    color: COLORS.textSecondary,
  },
  boldText: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  agreeButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  agreeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  conclusionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    marginTop: 15,
    textAlign: "center",
    color: COLORS.primary,
  },

  linkText: {
    color: COLORS.secondary,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  closeButton: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },

  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TermsAndConditions;
