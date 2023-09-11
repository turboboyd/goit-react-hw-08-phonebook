import { Routes, Route } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import Layout from './Layout/Layout';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../redux/auch';
import Loader from './Loader/Loader';
import { selectIsLoading } from 'redux/auch';
import { useSelector } from 'react-redux';
import NotFound from '../pages/NotFound/NotFound.jsx';
const LoginForm = lazy(() => import('../pages/LoginForm/LoginForm'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));



export const App = () => {
    const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          path="/login"
          element={<RestrictedRoute element={<LoginForm />} redirectTo="/" />}
        />

        <Route
          path="/register"
          element={<RestrictedRoute element={<LoginForm />} redirectTo="/" />}
          restricted
        />

        <Route
          path="/"
          element={<PrivateRoute element={<Contacts />} redirectTo="/login" />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
