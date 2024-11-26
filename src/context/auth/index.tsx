/* ----------- External ----------- */
import { jwtDecode } from 'jwt-decode';
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

/* ----------- Interfaces ----------- */
interface AuthContextData {
  userId: number;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface Props {
  children?: React.ReactNode;
}

interface Decoded {
  sub: string;
  exp: number;
  user_id: number;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  /* ----------- States ----------- */
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  /* ----------- Effects ----------- */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const local_token = localStorage.getItem('@expenses:token');

      if (local_token != null && local_token !== '') {
        const { user_id, exp }: Decoded = jwtDecode(local_token);

        if (Date.now() >= exp * 1000) {
          setToken('');
          localStorage.removeItem('@expenses:token');
          return;
        }

        setUserId(user_id);
        setToken(local_token);
      }
    }

    return () => {
      setToken('');
    };
  }, []);

  const value = useMemo(
    () => ({
      userId,
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
