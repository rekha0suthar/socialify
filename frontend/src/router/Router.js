import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route Component={ProtectedRoute}>
        <Route path="/dashboard" Component={Dashboard} />
      </Route>
    </Routes>
  );
};
