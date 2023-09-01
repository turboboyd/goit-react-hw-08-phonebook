import React from 'react';
import css from './CardFilm.module.css';
import defaultImg from '../../images/default-img.jpg';
import PropTypes from 'prop-types';

export default function CardFilm({
  title,
  name,
  src,
  rating,
  data,
  description,
  first_air_date,
}) {
  const displayTitle = title || name;
  const displayData = data || first_air_date;
  const displayImg = src ? `https://image.tmdb.org/t/p/w500${src}` : defaultImg;

  const roundedRating = parseFloat(rating).toFixed(1);

  const altText = displayTitle || 'Image';

  return (
    <li className={css.news_card}>
      <img
        className={css.news_card__image}
        src={displayImg}
        alt={altText}
        loading="lazy"
      />
      <div className={css.news_card__text_wrapper}>
        <div className={css.news_card__top_text}>
          <h2 className={css.news_card__title}>{displayTitle}</h2>
          <span className={css.rating}>{roundedRating}</span>
        </div>
        <p className={css.news_card__post_date}>{displayData}</p>
        <div className={css.news_card__details_wrapper}>
          <p className={css.news_card__excerpt}>{description}</p>
        </div>
      </div>
    </li>
  );
}

CardFilm.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
  rating: PropTypes.number,
  data: PropTypes.string,
  description: PropTypes.string,
  first_air_date: PropTypes.string,
};
