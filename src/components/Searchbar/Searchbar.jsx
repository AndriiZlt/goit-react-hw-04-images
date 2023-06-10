import React from 'react';
import { MdImageSearch } from 'react-icons/md';

class Searchbar extends React.Component {
  state = {
    query: '',
  };

  formChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(e.target.query.value);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="Search-form" onSubmit={this.submitHandler}>
          <button type="submit" className="Search-form-button">
            <span className="Search-form-button-label">
              <MdImageSearch />
            </span>
          </button>

          <input
            value={this.state.query}
            onChange={this.formChangeHandler}
            name="query"
            className="Search-form-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
