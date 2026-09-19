import { useEffect, useMemo, useState } from 'react';
import type { Job, JobFilters } from './types/job';
import { jobsData } from './data/jobs';
import JobCard from './components/JobCard';
import SearchFilter from './components/SearchFilter';
import Pagination from './components/Pagination';
import JobModal from './components/JobModal';
import Login from './components/Login';
import './App.css';

const PAGE_SIZE = 6;

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({ search: '', location: '', jobType: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Simulates an async API call (e.g. fetch('/api/jobs')) with a loading state.
  useEffect(() => {
    const timer = setTimeout(() => {
      setJobs(jobsData);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location))).sort(),
    [jobs]
  );
  const jobTypes = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.type))).sort(),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();
    const result = jobs.filter((job) => {
      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm));
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesType = !filters.jobType || job.type === filters.jobType;
      return matchesSearch && matchesLocation && matchesType;
    });

    const sorted = [...result].sort((a, b) => {
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return a.postedDaysAgo - b.postedDaysAgo; // newest first
    });

    return sorted;
  }, [jobs, filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleFilterChange = (nextFilters: JobFilters) => {
    setFilters(nextFilters);
    setCurrentPage(1); // reset to first page whenever filters change
  };

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  return (
    <div className="app">
      <header className="app__hero">
        <button className="app__logout" onClick={() => setCurrentUser(null)}>
          Log out
        </button>
        <p className="app__eyebrow">Job Board</p>
        <h1 className="app__title">HireBoard</h1>
        <p className="app__subtitle">Welcome, {currentUser} — find your next frontend role.</p>
      </header>

      <div className="app__body">
        <SearchFilter
          filters={filters}
          locations={locations}
          jobTypes={jobTypes}
          sortBy={sortBy}
          onFilterChange={handleFilterChange}
          onSortChange={setSortBy}
        />

        <main className="app__results">
          {isLoading ? (
            <p className="app__status">Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="app__status">No jobs match your filters.</p>
          ) : (
            <>
              <p className="app__count">{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found</p>
              <div className="job-grid">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} onClick={setSelectedJob} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}

export default App;
