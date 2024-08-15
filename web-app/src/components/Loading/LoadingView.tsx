import React from 'react';
import Loading from './Loading';

interface LoadingViewProps {
  open?: boolean;
}
const LoadingView: React.FC<LoadingViewProps> = (): React.ReactElement => {
  return <Loading size="lg" />;
};

export default LoadingView;
