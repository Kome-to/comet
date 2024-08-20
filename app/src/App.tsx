import { createTheme, ThemeProvider } from '@mui/material';
import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Outlet, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import './App.scss';
import { authGuard, routes, unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingView';
import PrivateRoute from './components/Route/PrivateRoute';
import SideBar from './components/SideBar/SideBar';
import TitleBar from './components/TitleBar/TitleBar';
import store, { persistor } from './store';

const SignInView = lazy(() => import('./views/SignInView/SignInView'));
const HomeView = lazy(() => import('./views/HomeView/HomeView'));

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

const OutletStyled = styled.div`
  background: radial-gradient(circle at 50% 50%, rgb(0, 61, 97) 20%, transparent 80%),
    conic-gradient(
      from 45deg at 50% 50%,
      rgb(0, 26, 45) 0%,
      rgb(0, 61, 97) 25%,
      rgb(0, 26, 45) 50%,
      rgb(0, 61, 97) 75%,
      rgb(0, 26, 45) 100%
    );
`;

const TitleBarLayout = ({ auth }: { auth?: boolean }) => {
  return (
    <>
      <TitleBar auth={auth} />
      <OutletStyled className={`app-container w-screen h-screen overflow-hidden flex ${auth && 'pt-[40px]'}`}>
        {auth && <SideBar />}
        <Outlet />
      </OutletStyled>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.Suspense fallback={<LoadingView open />}>
          <HashRouter>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="" element={<PrivateRoute guards={[authGuard]} element={<TitleBarLayout auth />} />}>
                  <Route index path={routes.DEFAULT} element={<HomeView />} />
                  <Route index path="*" element={<HomeView />} />
                </Route>
                <Route path="" element={<PrivateRoute guards={[unAuthGuard]} element={<TitleBarLayout />} />}>
                  <Route index path={routes.SIGN_IN} element={<SignInView />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </HashRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
