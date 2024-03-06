import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

function FilterNewsPannel({ onApplyFilters }) {
  const [filters, setFilters] = useLocalStorage('articleFilters', {
    category: '',
    source: '',
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div>
      <h2>Filter Articles</h2>
      <label>
        Category:
        <input type="text" name="category" placeholder='e.g.music, art' value={filters.category} onChange={handleChange} />
      </label>
      <label>
        Source:
        <select name="source" value={filters.source} onChange={handleChange}>
          <option value="">All</option>
          <option value="NewsAPI">NewsAPI</option>
          <option value="New York Times">New York Times</option>
          <option value="The Guardian">The Guardian</option>
        </select>
      </label>
      <label>
        Author:
        <input type="text" name="author" value={filters.author} onChange={handleChange} />
      </label>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
}

export default FilterNewsPannel;
