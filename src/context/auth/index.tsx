/* ----------- External ----------- */
import React, { createContext, useState, useContext, useMemo } from 'react';

/* ----------- Interfaces ----------- */
interface AuthContextData {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface Props {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  /* ----------- States ----------- */
  const [token, setToken] = useState<string>('');

  const value = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};
