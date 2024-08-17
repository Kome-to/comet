import { createTheme, ThemeProvider } from '@mui/material';
import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.scss';
import { authGuard, routes, unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingView';
import PrivateRoute from './components/Route/PrivateRoute';
import TitleBar from './components/TitleBar/TitleBar';
import store, { persistor } from './store';

const SignInView = lazy(() => import('./views/SignInView/SignInView'));

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
              <div className="app-container pt-8 w-screen h-screen">
                <TitleBar />
                <Routes>
                  <Route path={routes.DEFAULT} element={<PrivateRoute guards={[authGuard]} element={<SignInView />} />} />
                  <Route path={routes.SIGN_IN} element={<PrivateRoute guards={[unAuthGuard]} element={<SignInView />} />} />
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
