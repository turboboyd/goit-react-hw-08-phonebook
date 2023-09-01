import React from 'react';
import css from './LoadMoreBtn.module.css';
import PropTypes from 'prop-types';

function LoadMoreBtn(props) {
  return (
    <button onClick={props.handleLoadMore} className={css.blob_btn}>
      Load More
      <span className={css.blob_btn__inner}>
        <span className={css.blob_btn__blobs}>
          <span className={css.blob_btn__blob}></span>
          <span className={css.blob_btn__blob}></span>
          <span className={css.blob_btn__blob}></span>
          <span className={css.blob_btn__blob}></span>
        </span>
      </span>
    </button>
  );
}

export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

