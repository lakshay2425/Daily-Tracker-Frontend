import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext.jsx";
import toast from 'react-hot-toast';
import axios from 'axios';

export const useGoogleAuth = () => {
  const { setIsAuthenticated, setGmail, setIsLoading } = useContext(AuthContext);
  const authService = import.meta.env.VITE_AUTH_URL;
  const navigate = useNavigate();

  const googleResponse = async (authResult) => {
    try {
      let result;
      const businessName = "Daily Activity Tracker"
      if (authResult["code"]) {
        setIsLoading(true);
        result = await axios.get(
          `${authService}/auth/google/personal?code=${authResult["code"]}&businessName=${businessName}`, {
            withCredentials: true
          }
        );
      }
      if (result.status == 200) {
        if(result.data.access){
          setGmail(result.data.gmail);
          toast.success("LoggedIn Successfully");
          setIsAuthenticated(true);
          navigate("/home");
        }else{
          toast.error("You're not authorized to use this service. Contact Admin");
          setIsAuthenticated(false);
          setGmail("");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }finally{
      setIsLoading(false)
    }
  };

  const handleGoogleError = (error) => {
    if (
      error.error === "popup_closed_by_user" ||
      error.error === "access_denied"
    ) {
      toast.error("Account selection canceled.");
    } else {
      console.log("Google Login Error:", error);
      toast.error("Google login failed.");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: handleGoogleError,
    flow: "auth-code",
  });

  return { handleGoogleLogin };
};