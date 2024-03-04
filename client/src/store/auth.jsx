import { createContext, useContext, useState,useEffect } from "react";

export const AuthContext = createContext();
const URL="http://localhost:5000/api/auth/user"
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user,setUser] = useState("");
  const [services,setServices] = useState("");

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //Authentication curent logged in user data
  const userAuthentication=async()=>{
try {
    const response=await fetch(URL,{
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`,
        },});
        if(response.ok){
             const data = await response.json();
        console.log("user data ", data.userData);
        setUser(data.userData);
        }
    }
    
 catch (error) {
    console.log("errow catching user data");
}
  };
  
  const getServiceData = async () => { 
    try { 
    const response = await fetch("http://Localhost:5000/api/data/service", { 
    method: "GET", 
    }); 
    if (response.ok) { 
    const data = await response. json(); 
    setServices(data.msg); 
    } 
    console. log("service ");
    } catch (error) { 
    console.Log(error); 
    } }; 
    useEffect(() => { 
    getServiceData(); 
    userAuthentication(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] ); 
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user,services }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};