import type { Job } from '../types/job';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

function JobCard({ job, onClick }: JobCardProps) {
  return (
    <article className="job-card" onClick={() => onClick(job)}>
      <div className="job-card__header">
        <div>
          <h3 className="job-card__title">{job.title}</h3>
          <p className="job-card__company">
            <BuildingIcon /> {job.company} <span className="job-card__dot">·</span> <LocationIcon /> {job.location}
          </p>
        </div>
        <span className="job-card__type">{job.type}</span>
      </div>

      <p className="job-card__description">{job.description}</p>

      <div className="job-card__footer">
        <ul className="job-card__skills">
          {job.skills.map((skill) => (
            <li key={skill} className="job-card__skill-tag">{skill}</li>
          ))}
        </ul>
        <span className="job-card__posted">
          <ClockIcon /> {job.postedDaysAgo === 0 ? 'today' : `${job.postedDaysAgo}d ago`}
        </span>
      </div>
    </article>
  );
}

function BuildingIcon() {
  return (
    <svg className="icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default JobCard;
