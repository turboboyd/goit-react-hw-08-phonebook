import React, { useState } from 'react';
import css from './Search.module.css';
import PropTypes from 'prop-types';

export default function Search(props) {
  const [searchName, setSearchName] = useState('');
  const handleInput = e => setSearchName(e.currentTarget.value);

  const handleSubmit = e => {
    e.preventDefault();
    props.searchName({ searchName });
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <label
        className={`${css.search} ${searchName.length > 1 ? css.active : ''}`}
      >
        <input
          value={searchName}
          onChange={handleInput}
          id="inpt_search"
          type="text"
        />
      </label>
    </form>
  );
}

Search.propTypes = {
  searchName: PropTypes.func.isRequired,
};
