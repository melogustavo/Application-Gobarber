import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

// Esse segundo AuthContext apos o as eh pra burlar a tipagem do TS pois o TS vai ficar reclamando se vc deixar apenas com o  {} vazio, mas pra essa aplicacao nos precisamos justamente disso.
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Gustavo', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
