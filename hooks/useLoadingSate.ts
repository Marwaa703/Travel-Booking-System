import { useState } from "react";

const useLoadingState = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  return {
    loading,
    setLoading,
    msg,
    setMsg,
  };
};
export default useLoadingState;
