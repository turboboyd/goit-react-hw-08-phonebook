import React from 'react';
import PropTypes from 'prop-types';
import GenreItem from '../GenreItem/GenreItem';
import css from './GenresList.module.css';

export default function GenresList({ genres }) {
  return (
    <ul className={css.item_genres}>
      {genres.map(genre => (
        <GenreItem key={genre.id} genre={genre} />
      ))}
    </ul>
  );
}

GenresList.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
