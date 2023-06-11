import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ toggleModal, url }) {
  const clickHandler = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const escHandler = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', escHandler);
    return function cleanUp() {
      window.removeEventListener('keydown', escHandler);
    };
  });

  return (
    <div className="overlay" onClick={clickHandler}>
      <div className="modal">
        <img src={url} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};
