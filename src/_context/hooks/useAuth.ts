import { useContext } from "react";
import AuthContext from "../AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      `Please use the use auth hook only inside the AuthProvider`
    );
  return context;
};

export default useAuth;
