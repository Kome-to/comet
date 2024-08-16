import React from 'react';
import Loading from './Loading';

interface LoadingViewProps {
  open?: boolean;
}
const LoadingView: React.FC<LoadingViewProps> = (): React.ReactElement => {
  return (
    <div>
      <Loading size="lg" className="fixed inset-2/4" />
    </div>
  );
};

export default LoadingView;
