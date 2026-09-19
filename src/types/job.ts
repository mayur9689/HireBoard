export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-Time' | 'Internship' | 'Contract' | 'Part-Time';
  skills: string[];
  postedDaysAgo: number;
  description: string;
}

export interface JobFilters {
  search: string;
  location: string;
  jobType: string;
}
