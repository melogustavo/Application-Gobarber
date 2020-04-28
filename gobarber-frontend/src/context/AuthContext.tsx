import React, { createContext, useCallback, useState, useContext } from 'react';
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
  signOut(): void;
}

// Esse segundo AuthContext apos o as eh pra burlar a tipagem do TS pois o TS vai ficar reclamando se vc deixar apenas com o  {} vazio, mas pra essa aplicacao nos precisamos justamente disso.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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

  const signOut = useCallback(() => {
    localStorage.removeItem('@goBarber:token');
    localStorage.removeItem('@goBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    // esse value eh o que vai ser repassado e ai depois acessivel apos vc envolver as rotas com o <AuthProvider></AuthProvider>
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Esse useAuth eh o que vc vai chamar na pagina ou no componente para conseguir acessar as informacoes de user e signin
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
