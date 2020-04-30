import React from 'react';

import Globalstyle from './styles/global';
import SignIn from './pages/Signin';
// import SignUp from './pages/SignUp';

import AppProvider from './context';

const App: React.FC = () => (
  <>
    {/* O authContext.provider ou o AuthProvider eh o componente que agnt vai colocar em volta dos componentes que queremos que tenha autenticacao. */}
    <AppProvider>
      <SignIn />
    </AppProvider>

    <Globalstyle />
  </>
);
export default App;
