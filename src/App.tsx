import React, { useState } from 'react';
import TimesheetForm from './components/TimesheetForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import RomanianFlag from './components/RomanianFlag';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ro' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 py-4`}>
      <div className="max-w-lg mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 transform perspective-1000 hover:scale-[1.01] transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-12"></div>
            <h1 className="text-2xl font-bold text-center tracking-wide uppercase relative z-10">
              <span className="inline-block transform -skew-x-12 bg-blue-700 dark:bg-blue-900 px-3 py-1 shadow-lg rounded-lg">
                IONA
              </span>
              <span className="inline-block ml-2 text-xl">
                CIVIL ENGINEERS
              </span>
            </h1>
            <h2 className="text-lg font-semibold text-center mt-2 relative z-10">
              Timesheet Form
            </h2>
          </div>
          
          <div className="p-3 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <div className="flex justify-end items-center space-x-2 mb-4">
              <button
                onClick={toggleLanguage}
                className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                {i18n.language === 'en' ? <RomanianFlag size={20} /> : '🇬🇧'}
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <TimesheetForm />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;