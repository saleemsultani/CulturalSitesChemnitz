import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/user/is-login",
          {
            withCredentials: true,
          }
        );

        console.log(res);
        if (res.data.success) {
          setIsLogin((curr) => ({
            ...curr,
            token: res.data.token,
            user: res.data.user,
          }));
        } else {
          setIsLogin((curr) => ({
            ...curr,
            token: "",
            user: null,
          }));
        }
      } catch (err) {
        setIsLogin({
          token: "",
          user: null,
        });
        console.log(err);
      }
    }

    checkAuth();
    console.log("this is inside auth: ", isLogin);
  }, []); // run only once on first mount

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
