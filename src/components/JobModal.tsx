import type { Job } from '../types/job';

interface JobModalProps {
  job: Job;
  onClose: () => void;
}

function JobModal({ job, onClose }: JobModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <span className="job-card__type">{job.type}</span>
        <h2 className="modal__title">{job.title}</h2>
        <p className="modal__company">{job.company} · {job.location}</p>

        <div className="modal__meta">
          <span className="modal__meta-item">
            <LocationIcon /> {job.location}
          </span>
          <span className="modal__meta-item">
            <ClockIcon /> Posted {job.postedDaysAgo === 0 ? 'today' : `${job.postedDaysAgo}d ago`}
          </span>
        </div>

        <p className="modal__description">{job.description}</p>

        <div className="modal__skills-block">
          <h3 className="modal__section-title">Skills required</h3>
          <ul className="job-card__skills">
            {job.skills.map((skill) => (
              <li key={skill} className="job-card__skill-tag">{skill}</li>
            ))}
          </ul>
        </div>

        <button className="modal__apply-btn">Apply Now</button>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default JobModal;
