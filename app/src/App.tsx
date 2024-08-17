import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.scss';
import { routes, unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingView';
import PrivateRoute from './components/Route/PrivateRoute';
import { createTheme, ThemeProvider } from '@mui/material';
import store, { persistor } from './store';
import TitleBar from './components/TitleBar/TitleBar';

// const WelcomeView = lazy(() => import('./views/WelcomeView/WelcomeView'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1264A3',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.Suspense fallback={<LoadingView open />}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <div className="app-container">
                <TitleBar />
                <Routes>
                  <Route path={routes.DEFAULT} element={<PrivateRoute guards={[unAuthGuard]} element={<div></div>} />} />
                </Routes>
              </div>
            </ThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
