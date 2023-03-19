import React, { createContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

let AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let login = async ({ username, password }, callback) => {
    if (user()) {
      return;
    }

    return await fetch("http://localhost:5050/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("islogin", "true");
        }
        callback(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("islogin");
    document.location = "/login";
  };

  const user = () => {
    return !!localStorage.getItem("islogin");
  };

  let value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  let location = useLocation();

  if (!auth.user()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
