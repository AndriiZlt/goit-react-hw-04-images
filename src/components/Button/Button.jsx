import PropTypes from 'prop-types';
export default function Button({ loadMoreClickHandler }) {
  return (
    <button className="button" type="text" onClick={loadMoreClickHandler}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMoreClickHandler: PropTypes.func.isRequired,
};
