// import { useAppDispatch } from "@/redux/store";
// import { logout } from "@/redux/slices/authSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";

// const useLogout = () => {
//   const dispatch = useAppDispatch();

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("token");
//       await AsyncStorage.removeItem("user");
//       dispatch(logout());
//       router.replace("/login");
//       router.dismissAll(); //added to prevent go back to home after logout
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return handleLogout;
// };

// export default useLogout;
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      dispatch(logout());

      // Replace the current route with the login page
      router.replace("/login");

      // Optionally, dismiss any modals (if applicable)
      router.dismissAll();
      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
      // This will ensure the back button does not take you back to the previous routes
      // Make sure to implement this part in your main navigation logic
      // For example, in your App.js or main component
      // navigation.reset({ index: 0, routes: [{ name: 'login' }] });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
};

export default useLogout;
