import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './App.scss';
import { authGuard, routes, unAuthGuard } from './common/utils/routes';
import LoadingView from './components/Loading/LoadingView';
import PrivateRoute from './components/Route/PrivateRoute';
import store, { persistor } from './store';

const HomeView = lazy(() => import('./views/HomeView/HomeView'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.Suspense fallback={<LoadingView open />}>
          <BrowserRouter>
            <div className="app-container">
              <Routes>
                <Route path={routes.DEFAULT} element={<PrivateRoute guards={[authGuard]} element={<HomeView />} />} />
                <Route path={routes.LOGIN} element={<PrivateRoute guards={[unAuthGuard]} element={<HomeView />} />} />
              </Routes>
            </div>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
};

export default App;
