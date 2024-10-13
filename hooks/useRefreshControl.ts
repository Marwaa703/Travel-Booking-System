import { useState } from "react";
import { RefreshControlProps, RefreshControl } from "react-native";

type UseRefreshControlProps = {
  onRefresh: () => Promise<void>;
};

const useRefreshControl = ({ onRefresh }: UseRefreshControlProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const refreshControl: RefreshControlProps = {
    refreshing,
    onRefresh: handleRefresh,
    colors: ["#ff5b00"],
  };

  return { refreshControl };
};

export default useRefreshControl;
