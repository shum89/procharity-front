import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ReactNode;
  path: string;
  condition: boolean | string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, path, condition }) => {
  return <Route path={path}>{condition ? component : <Redirect to="/dashboard" />}</Route>;
};

export default ProtectedRoute;
