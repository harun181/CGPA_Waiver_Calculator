import React, { useState } from 'react';
import { GraduationCap, PlusCircle, FileDown } from 'lucide-react';
import { Course, Semester } from './types';
import SemesterCard from './components/SemesterCard';
import GradeTable from './components/GradeTable';
import PDFMarksheet from './components/PDFMarksheet';
import { calculateCGPA } from './utils/gradeCalculator';

const EMPTY_COURSE: Course = { name: '', grade: '', credits: '' };

function App() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, courses: [{ ...EMPTY_COURSE }] },
  ]);
  const [showTable, setShowTable] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { id: semesters.length + 1, courses: [{ ...EMPTY_COURSE }] },
    ]);
  };

  const deleteSemester = (semesterId: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((sem) => sem.id !== semesterId));
    }
  };

  const addCourse = (semesterId: number) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === semesterId
          ? { ...sem, courses: [...sem.courses, { ...EMPTY_COURSE }] }
          : sem
      )
    );
  };

  const updateCourse = (
    semesterId: number,
    courseIndex: number,
    field: keyof Course,
    value: string
  ) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              courses: sem.courses.map((course, i) =>
                i === courseIndex ? { ...course, [field]: value } : course
              ),
            }
          : sem
      )
    );
  };

  const deleteCourse = (semesterId: number, courseIndex: number) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              courses:
                sem.courses.length > 1
                  ? sem.courses.filter((_, i) => i !== courseIndex)
                  : sem.courses,
            }
          : sem
      )
    );
  };

  const cgpa = calculateCGPA(semesters.map((sem) => sem.courses));
  const hasValidCourses = semesters.some(semester => 
    semester.courses.some(course => course.name && course.grade && course.credits)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 pb-12">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bangladeshi CGPA Calculator
          </h1>
          <p className="text-gray-600 mb-4">
            Calculate your CGPA semester by semester
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowTable(!showTable)}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {showTable ? 'Hide' : 'Show'} Grade Table
            </button>
            {hasValidCourses && (
              <button
                onClick={() => setShowPDF(!showPDF)}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                <FileDown size={16} />
                {showPDF ? 'Hide' : 'Generate'} Marksheet
              </button>
            )}
          </div>
        </div>

        {showTable && <GradeTable />}
        {showPDF && <PDFMarksheet semesters={semesters} />}

        {semesters.map((semester) => (
          <SemesterCard
            key={semester.id}
            semester={semester}
            onAddCourse={addCourse}
            onUpdateCourse={updateCourse}
            onDeleteCourse={deleteCourse}
            onDeleteSemester={deleteSemester}
          />
        ))}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={addSemester}
            className="flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors"
          >
            <PlusCircle size={20} />
            <span>Add Next Semester</span>
          </button>
          <div className="text-2xl font-bold text-gray-800">
            Overall CGPA:{' '}
            <span className="text-indigo-600">{cgpa}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;