import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { COLORS } from "@/constants/theme";
import Header from "@/components/core/Header";
import UserEditForm from "@/components/forms/UserEditForm";
import ImagePickerCropper from "@/components/forms/ImagePickerCropper";
import { User } from "@/types/user";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "expo-router";
import useLogout from "@/hooks/useLogout";

const EditProfileScreen: React.FC = () => {
  const userEditFormRef = useRef<{ submitData: () => void }>(null);
  const router = useRouter();
  const user = useAppSelector(
    (state) => state.auth.currentUser,
  ) as unknown as User;
  const [image, setImage] = useState<string>(
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
  );
  // save image on redux
  useEffect(() => {}, [userEditFormRef, user]);
  const handleUpdate = () => {
    if (userEditFormRef.current) {
      userEditFormRef.current.submitData(); // Call the submit function in the child
    }
  };
  console.log({ user });
  return (
    <>
      <Header
        title="Edit Your Profile"
        rightIcon="checkmark"
        leftIcon="close"
        onLeftIconPress={() => router.back()}
        onRightIconPress={handleUpdate}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Profile Picture Section */}
          <View style={styles.profileContainer}>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <ImagePickerCropper onSelectImage={(uri) => setImage(uri)} />
          </View>

          <UserEditForm
            ref={userEditFormRef}
            user={user}
            profilePicture={image}
          />
        </View>
      </ScrollView>
    </>
  );
};
// <TouchableOpacity >
//   <Text style={styles.changeProfileText}>Change Profile Picture</Text>
// </TouchableOpacity>

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 100,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: COLORS.bg,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.opacity,
  },
});

export default EditProfileScreen;

//

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
