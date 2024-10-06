/* eslint-disable prettier/prettier */
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { router } from "expo-router"; 

const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
     
      await AsyncStorage.removeItem('token'); 
      await AsyncStorage.removeItem('user');  
      dispatch(logout());
      router.replace('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogout;
};

export default useLogout;