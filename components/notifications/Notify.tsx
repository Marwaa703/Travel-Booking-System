import React from "react";
import Toast, { ToastShowParams } from "react-native-toast-message";

interface NotifyProps {
  data: ToastShowParams;
}

const Notify: React.FC<NotifyProps> = ({ data }) => {
  React.useEffect(() => {
    Toast.show(data);
  }, [data]);

  return null; // No need to render anything
};

export default Notify;
