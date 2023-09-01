import React, { useState, useEffect, Suspense } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { fetchDetailsKino } from 'Service/Service';
import css from './MovieDetails.module.css';
import defaultImg from '../../images/default-img.jpg';
import Poster from '../../components/Poster/Poster';
import GenresList from '../../components/GenresList/GenresList';
import DetailsLinks from '../../components/DetailsLinks/DetailsLinks';
import ProductionCompaniesList from '../../components/ProductionCompaniesList/ProductionCompaniesList';
import Section from 'components/Section/Section';
import Loader from 'components/Loader/Loader';
import ScrollToTopButton from 'components/ScrollToTopButton/ScrollToTopButton';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [film, setFilm] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function fetchData() {
      try {
        const queryData = await fetchDetailsKino(movieId);
        setFilm(queryData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [movieId]);

  const displayImg = film.poster_path
    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
    : defaultImg;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Section>
        <Link className={css.button_back} to={location.state?.from ?? '/'}>
          <IoArrowBackSharp size={20} />
        </Link>
        <div className={css.details}>
          <Poster
            imageUrl={displayImg}
            altText={film.original_title}
            homepageLink={film.homepage}
          />
          <div className={css.details_wrap_description}>
            <div className={css.details_wrap_title}>
              <h1 className={css.title}>{film.original_title}</h1>
              <span className={css.rating}>
                {Math.round(parseFloat(film.vote_average) * 10) / 10}
              </span>
            </div>
            <div className={css.details_wrap_date}>
              <p className={css.details_text}>Release:</p>
              <span className={css.details_text}>{film.release_date}</span>
              <div>
                <GenresList genres={film.genres} />
              </div>
            </div>
            <span className={css.details_text}>{film.runtime}</span>
            <span className={css.details_text}>{film.vote_count}</span>
            <p className={css.details_text}>{film.homepage}</p>

            <p className={css.details_text}>{film.overview}</p>

            <div className={css.product_wrap}>
              {film.production_companies &&
              film.production_companies.length > 0 ? (
                <ProductionCompaniesList
                  companies={film.production_companies}
                />
              ) : (
                <p>No production companies available.</p>
              )}
            </div>
            <DetailsLinks/>
            <ScrollToTopButton />
          </div>
        </div>
      </Section>

      <Section>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Section>
    </>
  );
}
