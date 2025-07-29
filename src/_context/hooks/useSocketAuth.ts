import { useContext } from "react";
import SocketAuthContext from "../SocketAuthContext";

const useSocketAuth = () => {
  const context = useContext(SocketAuthContext);
  if (!context) {
    throw new Error(
      `useSocketAuth can only be used inside the socket auth context provider`
    );
  }
  return context;
};

export default useSocketAuth;
