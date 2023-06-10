import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  clickHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  escHandler = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.escHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escHandler);
  }

  render() {
    return (
      <div className="overlay" onClick={this.clickHandler}>
        <div className="modal">
          <img src={this.props.url} alt="" />
        </div>
      </div>
    );
  }
}
export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};
