declare module "redux-persist" {
  import { StoreEnhancer } from "redux";
  import { ComponentType } from "react";

  export interface PersistConfig {
    key: string;
    storage: any; // Adjust based on your storage type
    whitelist?: string[];
    blacklist?: string[];
    // Add any other options you might need
  }

  export function persistReducer(config: PersistConfig, reducer: any): any;
  export function persistStore(store: any): any;

  // Declare PersistGate
  export const PersistGate: ComponentType<{
    loading?: JSX.Element;
    persistor: any;
    children?: React.ReactNode;
  }>;

  // Other exports can be declared here as needed
}
