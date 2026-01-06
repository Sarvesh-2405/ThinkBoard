import React from 'react';
import './FilterSort.css';

const CATEGORIES = ['Personal', 'Work', 'Ideas', 'Important', 'Other'];

function FilterSort({ category, onCategoryChange, sortBy, onSortChange }) {
    return (
        <div className="filter-sort">
            <div className="filter-group">
                <label htmlFor="category-filter">Category:</label>
                <select
                    id="category-filter"
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="updated">Recently Updated</option>
                </select>
            </div>
        </div>
    );
}

export default FilterSort;
