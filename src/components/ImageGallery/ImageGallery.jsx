import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
class ImageGallery extends React.Component {
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.galleryItems.map(
          ({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              onClick={this.props.toggleModal}
              modalHandler={this.props.modalHandler}
            />
          )
        )}
      </ul>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  // galleryItems: PropTypes.arrayOf(
  //   PropTypes.exact({
  //     id: PropTypes.number.isRequired,
  //     webformatURL: PropTypes.string.isRequired,
  //     largeImageURL: PropTypes.string.isRequired,
  //     tags: PropTypes.string.isRequired,
  //   })
  // ),
  toggleModal: PropTypes.func.isRequired,
  modalHandler: PropTypes.func.isRequired,
};
