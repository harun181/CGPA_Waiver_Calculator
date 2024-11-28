import React from 'react';
import { Calculator, GraduationCap } from 'lucide-react';

interface NavigationProps {
  activeTab: 'cgpa' | 'waiver';
  onTabChange: (tab: 'cgpa' | 'waiver') => void;
  isDarkMode: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, isDarkMode }) => {
  return (
    <nav className="flex justify-center mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => onTabChange('cgpa')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'cgpa'
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <GraduationCap size={20} />
            <span>CGPA Calculator</span>
          </button>
          <button
            onClick={() => onTabChange('waiver')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'waiver'
                ? 'bg-indigo-600 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Calculator size={20} />
            <span>Waiver Calculator</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;