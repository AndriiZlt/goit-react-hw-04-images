import { useState } from 'react';
import { MdImageSearch } from 'react-icons/md';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const formChangeHandler = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const submitHandler = e => {
    e.preventDefault();
    onSubmit(e.target.query.value);
  };

  return (
    <header className="searchbar">
      <form className="Search-form" onSubmit={submitHandler}>
        <button type="submit" className="Search-form-button">
          <span className="Search-form-button-label">
            <MdImageSearch />
          </span>
        </button>

        <input
          value={query}
          onChange={formChangeHandler}
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
