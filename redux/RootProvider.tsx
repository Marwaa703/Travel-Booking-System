/* eslint-disable prettier/prettier */
// app/_layout.tsx
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store"; // Import the store and persistor from your Redux setup
import { Text } from "react-native";

export default function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        {children}
        {/* <Slot /> */}
      </PersistGate>
    </Provider>
  );
}
