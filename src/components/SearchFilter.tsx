import type { JobFilters } from '../types/job';

interface SearchFilterProps {
  filters: JobFilters;
  locations: string[];
  jobTypes: string[];
  sortBy: string;
  onFilterChange: (filters: JobFilters) => void;
  onSortChange: (sort: string) => void;
}

function SearchFilter({ filters, locations, jobTypes, sortBy, onFilterChange, onSortChange }: SearchFilterProps) {
  return (
    <div className="search-filter">
      <input
        type="text"
        className="search-filter__input"
        placeholder="Search by title, company, or skill..."
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
      />

      <select
        className="search-filter__select"
        value={filters.location}
        onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
      >
        <option value="">All locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <select
        className="search-filter__select"
        value={filters.jobType}
        onChange={(e) => onFilterChange({ ...filters, jobType: e.target.value })}
      >
        <option value="">All types</option>
        {jobTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select
        className="search-filter__select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="newest">Newest first</option>
        <option value="company">Company A-Z</option>
      </select>
    </div>
  );
}

export default SearchFilter;
