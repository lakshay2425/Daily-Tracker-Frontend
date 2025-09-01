import  { createContext, useState, useEffect } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gmail, setGmail] = useState("");
  const [isLoading, setIsLoading] = useState(true)

const checkAuthStatus = async () => {
try {
    const apiResponse = await axios.get(`${import.meta.env.VITE_AUTH_URL}/auth/google/verify`, {
      withCredentials: true
    }
    )
    // console.log(apiResponse, "API response of verify token")
    if(apiResponse.status === 200){
      setIsAuthenticated(true);
      setGmail(apiResponse.data.gmail);
    }else{
      setIsAuthenticated(false);
      setGmail("");
    }
} catch (error) {
  console.log("Faled to verify", error.message);
}finally{
  setIsLoading(false);
}
}
  useEffect( ()=>{
    if(gmail == ""){
      checkAuthStatus();
    }
  }, [gmail])

  const authContextValue = {
    isAuthenticated,
    gmail,
    setGmail,
    setIsAuthenticated,
    isLoading,
    setIsLoading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

