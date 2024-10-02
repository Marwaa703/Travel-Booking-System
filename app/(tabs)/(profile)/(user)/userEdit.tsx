/* eslint-disable prettier/prettier */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';
import Header from '@/components/core/Header';
import UserEditForm from '@/components/forms/UserEditForm';

const EditProfileScreen: React.FC = () => {
  const userEditFormRef = useRef<{ submitData: () => void }>(null);
  
  
  const handleUpdate = ()=>{ 
    if (userEditFormRef.current) {
      userEditFormRef.current.submitData(); // Call the submit function in the child
    }
    }
  return (
    <>
      <Header 
        title='Edit Your Profile' 
        rightIcon='checkmark' 
        leftIcon='close' 
        onLeftIconPress={() => {}} 
        onRightIconPress={ handleUpdate} 
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Profile Picture Section */}
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg" }}
              style={styles.profileImage}
            />
            <TouchableOpacity>
              <Text style={styles.changeProfileText}>Change Profile Picture</Text>
            </TouchableOpacity>
          </View>

          <UserEditForm 
            ref={userEditFormRef}
        user={{
            firstName:'Latif',
            lastName:'essam',
            phone:'01205175195',
            address:'4654as54as5sda',
          }}/>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20, 
    marginBottom: 100, 
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity,
  },
  changeProfileText: {
    color: COLORS.secondary,
    marginTop: 20,
    fontSize: FONTS.medium,
  },
});

export default EditProfileScreen;


// /* eslint-disable prettier/prettier */

// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import InputField from '@/components/InputField';
// import { COLORS, FONTS } from '@/constants/theme';
// import { router } from 'expo-router';
// import Header from '@/components/core/Header';

// const EditProfileScreen: React.FC = () => {
//   return (
//     <>
//     <Header title='Edit Your Profile' rightIcon='checkmark' leftIcon='close' onLeftIconPress={()=>{}} onRightIconPress={()=>{router.push("userProfile")}}/>
//       <ScrollView>
//     <View style={styles.container}>
//       {/* <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Edit Profile</Text>
//         <TouchableOpacity onPress={()=>{router.push("userProfile")}}>
//           <Text style={styles.doneText}>Done</Text>
//         </TouchableOpacity>
//       </View> */}

//       {/* Profile Picture Section */}
//       <View style={styles.profileContainer}>
//         <Image
//           source={{uri:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"}}
//           style={styles.profileImage}
//         />
//         <TouchableOpacity>
//           <Text style={styles.changeProfileText}>Change Profile Picture</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Input Fields */}
//       <InputField
//         label="First Name"
//         value="Leonardo"
//         required
//       />
//       <InputField
//         label="Last Name"
//         value="Ahmed"
//         required
//       />
//       <InputField
//         label="Location"
//         value="Sylhet Bangladesh"
//         required
//       />
//       <InputField
//         label="Mobile Number"
//         value="+88 01758-000666"
//         type="phone"
//         required
//       />
//     </View>
//     </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     marginTop:100
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   headerTitle: {
//     fontSize: FONTS.large,
//     color: COLORS.textPrimary,
//     fontWeight: 'bold',
//   },
//   doneText: {
//     fontSize: FONTS.medium,
//     color: COLORS.primary,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: COLORS.opacity,
//   },
//   changeProfileText: {
//     color: COLORS.secondary,
//     marginTop: 20,
//     fontSize: FONTS.medium,
//   },
// });

// export default EditProfileScreen;