
import React from 'react';
import ProductionCompany from '../ProductionCompany/ProductionCompany';
import css from './ProductionCompaniesList.module.css';
import PropTypes from 'prop-types';

const ProductionCompaniesList = ({ companies }) => (
  <ul className={css.details_company}>
    {companies.map(company => (
      <ProductionCompany key={company.id} company={company} />
    ))}
  </ul>
);

ProductionCompaniesList.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      logo_path: PropTypes.string,
    })
  ).isRequired,
};

export default ProductionCompaniesList;
