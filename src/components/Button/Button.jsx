import React from 'react';
import PropTypes from 'prop-types';
class Button extends React.Component {
  render() {
    return (
      <button
        className="button"
        type="text"
        onClick={this.props.btnClickHandler}
      >
        Load more
      </button>
    );
  }
}
export default Button;

Button.propTypes = {
  btnClickHandler: PropTypes.func.isRequired,
};
