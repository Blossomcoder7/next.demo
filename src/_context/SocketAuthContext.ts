import React, { createContext } from "react";

export interface SocketAuthContextType {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  socketInstance: any;
  setSocketInstance: React.Dispatch<React.SetStateAction<any>>;
}
const SocketAuthContext = createContext<SocketAuthContextType | undefined>(
  undefined
);

export default SocketAuthContext;
