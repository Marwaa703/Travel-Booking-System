/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import companiesData from "@/DummyData/companies.json";
import { COLORS } from '@/constants/theme';
import Header from '@/components/core/Header';

interface Company {
  title: string;
  subtitle: string;
  rating: number;
  trips: number;
  image: { uri: string };
}

const ApprovedCompaniesScreen: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(companiesData.companies);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ title: string; subtitle: string }>({
    title: '',
    subtitle: ''
  });

  // Handle Update company data for selected company
  const updateCompany = (companyTitle: string) => {
    if (editData.title === '' || editData.subtitle === '') {
      Alert.alert('Please enter valid data');
      return;
    }
    setCompanies(companies.map(company =>
      company.title === companyTitle ? { ...company, title: editData.title, subtitle: editData.subtitle } : company
    ));
    setSelectedCompany(null);
    setEditData({ title: '', subtitle: '' });
  };

  // Handle Delete Company
  const deleteCompany = (companyTitle: string) => {
    setCompanies(companies.filter(company => company.title !== companyTitle));
  };

  return (
    <>
      <Header title={"Approved Companies"} />
      <View style={styles.container}>
      <Text style={styles.title}>Manage Companies</Text>
        {/* List of Companies */}
        <FlatList
          data={companies}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <View style={styles.companyContainer}>
              <Image source={{ uri: item.image.uri }} style={styles.companyImage} />
              <View style={styles.companyDetails}>
                <View style={styles.companyHeader}>
                  <Text style={styles.companyTitle}>{item.title}</Text>
                  <View style={styles.iconGroup}>
                    <TouchableOpacity onPress={() => {
                      setSelectedCompany(item.title);
                      setEditData({ title: item.title, subtitle: item.subtitle });
                    }}>
                      <Ionicons name="pencil-outline" size={20} color={COLORS.link} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteCompany(item.title)} style={styles.iconButton}>
                      <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.companySubtitle}>{item.subtitle}</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Trips: {item.trips}</Text>

                {selectedCompany === item.title && (
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Enter title"
                      value={editData.title}
                      onChangeText={(text) => setEditData(prev => ({ ...prev, title: text }))}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Enter subtitle"
                      value={editData.subtitle}
                      onChangeText={(text) => setEditData(prev => ({ ...prev, subtitle: text }))}
                      style={styles.input}
                    />
                    <TouchableOpacity onPress={() => updateCompany(item.title)} style={styles.iconButton}>
                      <Ionicons name="checkmark" size={24} color={COLORS.success} />
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
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  companyContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  companyImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 8,
  },
  companyDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  companySubtitle: {
    fontSize: 14,
    color: COLORS.textSubtitle,
    marginBottom: 5,
  },
  inputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
});
