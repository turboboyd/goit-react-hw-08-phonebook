import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import Layout from './Layout/Layout';

const LoginForm = lazy(() => import('../pages/LoginForm/LoginForm'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<LoginForm />} />

        <Route path="contacts" element={<Contacts />} />
      </Route>
    </Routes>
  );
};
