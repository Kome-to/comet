import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { RouteGuard } from '../../common/utils/routes';
import { storage } from '@/common/utils/storage';

interface PrivateRouteProps {
  guards: RouteGuard[];
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, guards }) => {
  /*
   * Decide what to render into the route
   */
  for (const guard of guards) {
    if (!guard.requestDone) {
      // if guard request isn't done then render nothing and wait for requestDone to change
      return null;
    }

    if (guard.failCondition()) {
      // if guard request is done then check if failCondition matches
      // and if it does then either redirect to onFail or display nothing
      if (guard.onFail) {
        return <Navigate to={guard.onFail} replace />;
      }
      return null;
    }
  }

  return element;
};

export default PrivateRoute;
