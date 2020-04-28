import React from 'react';

import Globalstyle from './styles/global';
import SignIn from './pages/Signin';
// import SignUp from './pages/SignUp';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    {/* O authContext.provider eh o componente que agnt vai colocar em volta dos componentes que queremos que tenha autenticacao. */}
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <Globalstyle />
  </>
);
export default App;
