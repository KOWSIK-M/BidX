// src/components/SearchBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchQuery, onSearchChange }) => (
  <div className="col-3">
    <input
      type="text"
      value={searchQuery}
      onChange={onSearchChange}
      placeholder="Search products..."
      className="searchInput"
    />
    <FontAwesomeIcon icon={faSearch} className="searchIcon" />
  </div>
);

export default SearchBar;
