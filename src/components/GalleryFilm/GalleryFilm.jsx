import { Link } from 'react-router-dom';
import CardFilm from '../CardFilm/CardFilm';
import PropTypes from 'prop-types';
import css from './GalleryFilm.module.css';
import { useLocation } from 'react-router-dom';

export default function GalleryFilm({ queryFilm, isOnMoviesPage }) {
  const location = useLocation();

  return (
    <ul className={css.content_wrapper}>
      {queryFilm.map(
        ({
          id,
          title,
          vote_average,
          release_date,
          poster_path,
          overview,
          name,
          first_air_date,
        }) => (
          <Link
            key={id}
            to={isOnMoviesPage ? `${id}` : `/movies/${id}`}
            state={{ from: location }}
          >
            <CardFilm
              title={title}
              src={poster_path}
              rating={vote_average}
              data={release_date}
              description={overview}
              name={name}
              poster_path={first_air_date}
            />
          </Link>
        )
      )}
    </ul>
  );
}

GalleryFilm.propTypes = {
  queryFilm: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
      poster_path: PropTypes.string,
      overview: PropTypes.string,
      name: PropTypes.string,
      first_air_date: PropTypes.string,
    })
  ),
  isOnMoviesPage: PropTypes.bool,
};
