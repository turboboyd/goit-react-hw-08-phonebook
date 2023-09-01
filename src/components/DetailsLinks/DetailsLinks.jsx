import React from 'react';
import { Link } from 'react-router-dom';
import css from './DetailsLinks.module.css';
import { animateScroll as scroll } from 'react-scroll';

export default function DetailsLinks() {
  const scrollToCast = () => {
    scroll.scrollTo(800);
  };
  return (
    <ul className={css.list_link}>
      <li>
        <Link
          className={css.details_link}
          to="cast"
          smooth="true"
          onClick={scrollToCast}
        >
          Cast
        </Link>
      </li>
      <li>
        <Link
          className={css.details_link}
          to="reviews"
          smooth="true"
          onClick={scrollToCast}
        >
          Reviews
        </Link>
      </li>
      <li>
        <Link
          className={css.details_link}
          to="trailer"
          smooth="true"
          onClick={scrollToCast}
        >
          Trailer
        </Link>
      </li>
    </ul>
  );
}
