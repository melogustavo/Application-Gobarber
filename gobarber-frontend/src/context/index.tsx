import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

// Esse app provider eh pra ir englobando todas os seus context em um unico arquivo. pra ficar menor a importacao la no app.tsx
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
