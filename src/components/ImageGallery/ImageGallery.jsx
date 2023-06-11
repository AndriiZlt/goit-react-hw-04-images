import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
export default function ImageGallery({
  galleryItems,
  toggleModal,
  modalHandler,
}) {
  return (
    <ul className="ImageGallery">
      {galleryItems.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={toggleModal}
          modalHandler={modalHandler}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  galleryItems: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalHandler: PropTypes.func.isRequired,
};
