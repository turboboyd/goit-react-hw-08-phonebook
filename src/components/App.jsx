import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import Layout from './Layout/Layout';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));
const Trailer = lazy(() => import('../components/Trailer/Trailer.jsx'));
const Modal = lazy(() => import('../components/Modal/Modal.jsx'));
const Actor = lazy(() => import('../components/Actor/Actor'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />}>
            <Route
              path=":actorId"
              element={
                <Modal>
                  <Actor />
                </Modal>
              }
            />
          </Route>

          <Route path="reviews" element={<Reviews />} />
          <Route path="trailer" element={<Trailer />} />
        </Route>
      </Route>
    </Routes>
  );
};
