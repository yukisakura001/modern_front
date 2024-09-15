import React, { useContext, ReactNode } from "react";

interface AuthContextProps {
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
}); //初期値

export const useAuth = () => {
  return useContext(AuthContext); //useContextでAuthContextを返す
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (token: string) => {
    localStorage.setItem("auth_token", token); //localStorageにtokenを保存
  };
  const logout = () => {
    localStorage.removeItem("auth_token"); //localStorageのtokenを削除
  };
  const value = { login, logout }; //valueにloginとlogoutを入れる

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; //AuthProviderでvalueを渡す
};
