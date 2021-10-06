import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.ReactNode;
  path: string;
  condition: boolean | string;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, path, condition }) =>  (

      <Route path={path}>{condition ? component : <Redirect to="/" />}</Route>

  );

export default ProtectedRoute;
