import React, { useState, useEffect, useCallback } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isSeller: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("accessToken");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Cabin, sans-serif",
    fontSize: 12,
    fontWeightRegular: 400,
    fontWeightMedium: 500,

    h1: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.2,
    },
  },
});

export const AuthContextProvider = (props) => {
  const isSellerInLocalStorage = localStorage.getItem("isSeller");
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const [userId, setUserId] = useState(-1);
  const [userName, setUserName] = useState("");
  const [isSeller, setIsSeller] = useState(isSellerInLocalStorage);

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_surname");

    localStorage.removeItem("user_mail");
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_id");
    localStorage.removeItem("isSeller");
    localStorage.removeItem("seller_id");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (
    token,
    expirationTime,
    user_id,
    manufacturer_id,
    user_name
  ) => {
    setToken(token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("expirationTime", expirationTime);
    setUserId(user_id);
    setUserName(user_name);

    if (manufacturer_id !== null) {
      setIsSeller(true);
    }

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (!tokenData) {
      logoutHandler();
      return;
    }
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userId: userId,
    userName: userName,
    isSeller: isSeller,
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default AuthContext;
