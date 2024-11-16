export interface Course {
  name: string;
  grade: string;
  credits: string;
}

export interface Semester {
  id: number;
  courses: Course[];
}

export type Grades = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';