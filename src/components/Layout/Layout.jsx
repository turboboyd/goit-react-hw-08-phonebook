import Header from 'components/Header/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import css from './Container.module.css';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, } from 'redux/auch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isLoading = useSelector(selectIsLoading);
  return (
    <>
      <main>
        <Suspense fallback={<Loader />}>
          {isLoggedIn && <Header />}
          <Outlet />
        </Suspense>
        <ToastContainer />
      </main>
    </>
  );
}
