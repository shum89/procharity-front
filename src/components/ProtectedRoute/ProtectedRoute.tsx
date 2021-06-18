import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ReactNode;
  path: string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, path }) => {
  return <Route path={path}>{false ? component : <Redirect to="./" />}</Route>;
};

export default ProtectedRoute;
