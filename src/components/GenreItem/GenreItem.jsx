import React from 'react';
import css from './GenreItem.module.css'
import PropTypes from 'prop-types';

export default function GenreItem({ genre }) {
  return (
    <li className={css.item}>
      <p className={css.details_text}>{genre.name}</p>
    </li>
  );
}

GenreItem.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};