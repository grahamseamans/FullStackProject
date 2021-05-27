import React from 'react';
import SearchBar from 'material-ui-search-bar';

export function NavBar() {
  return (
    <div className="searchbar">
      <SearchBar
        placeholder="Search a city..."
        onChange={(e) => console.log(e)}
        autoFocus
      />
    </div>
  );
};