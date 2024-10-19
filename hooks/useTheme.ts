// colors.ts
import { dark, light } from "@/constants/theme";
import { useAppSelector } from "@/redux/store";

export const useTheme = () => {
  const themeColor = useAppSelector((state) => state.theme.color);

  return themeColor === "dark" ? dark : light;
};
