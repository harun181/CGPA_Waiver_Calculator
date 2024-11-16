import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { Semester } from '../types';
import { calculateGPA, calculateCGPA } from '../utils/gradeCalculator';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#4b5563',
  },
  semesterTitle: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  col1: {
    width: '50%',
  },
  col2: {
    width: '25%',
    textAlign: 'center',
  },
  col3: {
    width: '25%',
    textAlign: 'center',
  },
  gpaText: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 14,
    color: '#1e40af',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 10,
  },
});

interface PDFMarksheetProps {
  semesters: Semester[];
}

const PDFMarksheet: React.FC<PDFMarksheetProps> = ({ semesters }) => {
  const cgpa = calculateCGPA(semesters.map((sem) => sem.courses));

  return (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Academic Transcript</Text>
            <Text style={styles.subtitle}>
              Generated on {new Date().toLocaleDateString()}
            </Text>
          </View>

          {semesters.map((semester) => {
            const semesterGPA = calculateGPA(semester.courses);
            const validCourses = semester.courses.filter(
              (course) => course.name && course.grade && course.credits
            );

            if (validCourses.length === 0) return null;

            return (
              <View key={semester.id}>
                <Text style={styles.semesterTitle}>
                  Semester {semester.id}
                </Text>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.col1}>Subject</Text>
                    <Text style={styles.col2}>Grade</Text>
                    <Text style={styles.col3}>Credits</Text>
                  </View>
                  {validCourses.map((course, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.col1}>{course.name}</Text>
                      <Text style={styles.col2}>{course.grade}</Text>
                      <Text style={styles.col3}>{course.credits}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.gpaText}>
                  Semester GPA: {semesterGPA}
                </Text>
              </View>
            );
          })}

          <View style={{ marginTop: 30 }}>
            <Text style={[styles.gpaText, { fontSize: 16, fontWeight: 'bold' }]}>
              Cumulative GPA (CGPA): {cgpa}
            </Text>
          </View>

          <Text style={styles.footer}>
            This is a computer-generated document. No signature is required.
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFMarksheet;