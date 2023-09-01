import React from 'react';
import PropTypes from 'prop-types';

export default function ProductionCompany({ company }) {
  const { id, name, logo_path } = company;
  if (!logo_path) {
    return null;
  }

  return (
    <li key={id}>
      <img
        src={`https://image.tmdb.org/t/p/original/${logo_path}`}
        alt={name}
        loading="lazy"
      />
    </li>
  );
}

ProductionCompany.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    logo_path: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};