import React from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends React.Component {
  clickHandler = e => {
    this.props.modalHandler(e.target);
  };

  render() {
    return (
      <li className="ImageGalleryItem" onClick={this.clickHandler}>
        <img
          className="ImageGalleryItem-image"
          src={this.props.webformatURL}
          alt={this.props.tags}
          data-url={this.props.largeImageURL}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  modalHandler: PropTypes.func.isRequired,
};
