import { createTheme, ThemeProvider } from '@mui/material';
import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import './App.scss';
import { authGuard, routes, unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingView';
import PrivateRoute from './components/Route/PrivateRoute';
import store, { persistor } from './store';

const WelcomeView = lazy(() => import('./views/WelcomeView/WelcomeView'));
const GetStartedView = lazy(() => import('./views/GetStartedView/GetStartedView'));
const SignInView = lazy(() => import('./views/SignInView/SignInView'));
const WorkspaceSelectionView = lazy(() => import('./views/WorkspaceSelectionView/WorkspaceSelectionView'));

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
                <Routes>
                  <Route
                    path={routes.WORKSPACE_SELECTION}
                    element={<PrivateRoute guards={[authGuard]} element={<WorkspaceSelectionView />} />}
                  />
                  <Route
                    path={routes.DEFAULT}
                    element={<PrivateRoute guards={[authGuard]} element={<Navigate to={routes.WORKSPACE_SELECTION} />} />}
                  />
                  <Route path={routes.DEFAULT} element={<PrivateRoute guards={[unAuthGuard]} element={<WelcomeView />} />} />
                  <Route path={routes.GET_STATED} element={<PrivateRoute guards={[unAuthGuard]} element={<GetStartedView />} />} />
                  <Route path={routes.SIGN_IN} element={<PrivateRoute guards={[unAuthGuard]} element={<SignInView />} />} />
                  <Route path={'*'} element={<PrivateRoute guards={[unAuthGuard]} element={<WelcomeView />} />} />
                </Routes>
                <ToastContainer />
              </div>
            </ThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
