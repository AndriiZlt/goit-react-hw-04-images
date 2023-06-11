import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
  modalHandler,
}) {
  const clickHandler = e => {
    modalHandler(e.target);
  };

  return (
    <li className="ImageGalleryItem" onClick={clickHandler}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        data-url={largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  modalHandler: PropTypes.func.isRequired,
};
