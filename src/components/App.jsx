import { Routes, Route } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import Layout from './Layout/Layout';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../redux/auch';

const LoginForm = lazy(() => import('../pages/LoginForm/LoginForm'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          path="login"
          element={
            <RestrictedRoute element={<LoginForm />} redirectTo="/contacts" />
          }
        />

        <Route
          path="register"
          element={
            <RestrictedRoute element={<LoginForm />} redirectTo="/contacts" />
          }
        />

        <Route
          path="contacts"
          element={<PrivateRoute element={<Contacts />} redirectTo="/login" />}
        />
      </Route>
    </Routes>
  );
};
