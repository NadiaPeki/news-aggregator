import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import styles from './FilterNewsPannel.module.css';

function FilterNewsPannel({ onApplyFilters }) {
  const [filters, setFilters] = useLocalStorage('articleFilters', {
    category: '',
    source: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className={styles.filterPannel}>
      <h2 className={styles.filterHeader}>Filter Articles</h2>
      <div className={styles.filtersWrapper}>
        <label className={styles.labelText}>
          Category:
          <input
            type="text"
            name="category"
            placeholder="e.g.music, art"
            className={styles.inputFilter}
            value={filters.category}
            onChange={handleChange}
          />
        </label>
        <label className={styles.labelText}>
          Author:
          <input
            type="text"
            name="author"
            placeholder="type the author's name"
            className={styles.inputFilter}
            value={filters.author}
            onChange={handleChange}
          />
        </label>
        <label className={styles.labelTextCategory}>
          Source:
          <select
            name="source"
            className={styles.inputSelect}
            value={filters.source}
            onChange={handleChange}>
            <option value="">All</option>
            {/* <option value="NewsAPI">NewsAPI</option> */}
            <option value="New York Times">New York Times</option>
            <option value="The Guardian">The Guardian</option>
          </select>
        </label>
        <button className={styles.buttonFilter} onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterNewsPannel;
