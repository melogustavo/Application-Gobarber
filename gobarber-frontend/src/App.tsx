import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Globalstyle from './styles/global';
import Routes from './routes/index';

import AppProvider from './context';

const App: React.FC = () => (
  <BrowserRouter>
    {/* O authContext.provider ou o AuthProvider eh o componente que agnt vai colocar em volta dos componentes que queremos que tenha autenticacao. */}
    <AppProvider>
      <Routes />
    </AppProvider>

    <Globalstyle />
  </BrowserRouter>
);
export default App;
