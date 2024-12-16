import React from 'react';
import { useLocation, RouteProps, Navigate } from 'react-router-dom';
import { Location } from 'react-router-dom';

const Interceptor: React.FunctionComponent<RouteProps> = ({ children }) => {

  const location: Location = useLocation();
  const path: string = location.pathname;

  if (path === '/') {
    return <Navigate to={'/energy/'} />;
  }

  return children;
};

export default Interceptor;
