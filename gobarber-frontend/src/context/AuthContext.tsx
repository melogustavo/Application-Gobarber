import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

// Esse segundo AuthContext apos o as eh pra burlar a tipagem do TS pois o TS vai ficar reclamando se vc deixar apenas com o  {} vazio, mas pra essa aplicacao nos precisamos justamente disso.
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  // O que vc esta fazendo nesse state eh criando uma verificacao para que ele verifique se ja existe um token e user no local storage... se tiver ele ja vai iniciar com esses dados.
  // Essa logica so vai servir pra quando o usuario der um refresh na pagina ou sair e voltar, pra ele nao ter que logar novamente
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@goBarber:token');
    const user = localStorage.getItem('@goBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem('@goBarber:token', token);
    localStorage.setItem('@goBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
