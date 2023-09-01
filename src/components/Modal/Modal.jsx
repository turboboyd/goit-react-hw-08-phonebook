import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      props.onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        {props.children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
