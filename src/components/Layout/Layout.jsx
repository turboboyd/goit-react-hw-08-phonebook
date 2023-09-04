// import Header from 'components/Header/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './Container.module.css';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectStatus, selectToken } from 'redux/auch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {
  const status = useSelector(selectStatus);
   const token = useSelector(selectToken);
   console.log('token: ', token);
  return (
    <>
      {/* <div className={css.container}>
        <Header />
      </div> */}
      <ToastContainer />
      <main>
        <div className={css.container}>
          {status === 'loading' ? (
            <Loader />
          ) : (
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          )}
        </div>
      </main>
    </>
  );
}
