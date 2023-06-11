import PropTypes from 'prop-types';
export default function Button({ btnClickHandler }) {
  return (
    <button className="button" type="text" onClick={btnClickHandler}>
      Load more
    </button>
  );
}

Button.propTypes = {
  btnClickHandler: PropTypes.func.isRequired,
};
