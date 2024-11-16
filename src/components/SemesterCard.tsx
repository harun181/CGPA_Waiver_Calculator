import React from 'react';
import { X, PlusCircle } from 'lucide-react';
import { Course, Semester, Grades } from '../types';
import { calculateGPA } from '../utils/gradeCalculator';
import CourseInput from './CourseInput';

interface SemesterCardProps {
  semester: Semester;
  onAddCourse: (semesterId: number) => void;
  onUpdateCourse: (semesterId: number, courseIndex: number, field: keyof Course, value: string) => void;
  onDeleteCourse: (semesterId: number, courseIndex: number) => void;
  onDeleteSemester: (semesterId: number) => void;
}

const SemesterCard: React.FC<SemesterCardProps> = ({
  semester,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onDeleteSemester,
}) => {
  const gpa = calculateGPA(semester.courses);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Semester {semester.id}</h2>
        <button
          onClick={() => onDeleteSemester(semester.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {semester.courses.map((course, index) => (
          <CourseInput
            key={index}
            course={course}
            onChange={(field, value) => onUpdateCourse(semester.id, index, field, value)}
            onDelete={() => onDeleteCourse(semester.id, index)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => onAddCourse(semester.id)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
        >
          <PlusCircle size={20} />
          <span>Add Subject</span>
        </button>
        <p className="text-lg font-semibold">
          Semester GPA: <span className="text-indigo-600">{gpa}</span>
        </p>
      </div>
    </div>
  );
};

export default SemesterCard;