import Header from 'components/Header/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './Container.module.css';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectToken, selectIsLoading } from 'redux/auch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);
  console.log('token: ', token);
  return (
    <>

      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>

        <ToastContainer />
      </main>
    </>
  );
}
