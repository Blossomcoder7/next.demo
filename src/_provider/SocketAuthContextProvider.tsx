/* eslint-disable @typescript-eslint/no-explicit-any */
import SocketAuthContext from "@/_context/SocketAuthContext";
import React, { useState } from "react";

const SocketAuthContextProvider = ({
  children,
}: {
  children: React.ReactElement<any, any>;
}) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [socket, setSocket] = useState<any | undefined>(undefined);

  return (
    <SocketAuthContext.Provider
      value={{
        setSocketInstance: setSocket,
        setToken,
        socketInstance: socket,
        token,
      }}
    >
      {children}
    </SocketAuthContext.Provider>
  );
};

export default SocketAuthContextProvider;
