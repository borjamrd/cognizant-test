export type SeniorityLevel = 'junior' | 'senior';

export interface Candidate {
  name: string;
  surname: string;
  seniority: SeniorityLevel;
  years: number;
  availability: boolean;
}
