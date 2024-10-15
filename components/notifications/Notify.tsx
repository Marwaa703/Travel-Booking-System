import React, { forwardRef } from "react";
import Toast, { ToastShowParams } from "react-native-toast-message";

interface NotifyProps {
  data: ToastShowParams;
}

// Wrap Notify with forwardRef
// eslint-disable-next-line react/display-name
const Notify = forwardRef<unknown, NotifyProps>(({ data }, ref) => {
  React.useEffect(() => {
    Toast.show(data);
  }, [data]);

  return null; // No need to render anything
});

export default Notify;
