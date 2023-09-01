import Header from 'components/Header/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './Container.module.css';
import Loader from 'components/Loader/Loader';

export default function Layout() {
  return (
    <>
      <div className={css.container}>
        <Header />
      </div>
      <main>
        <div className={css.container}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
}
