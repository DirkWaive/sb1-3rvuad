import React, { useState, useEffect } from 'react';
import DayForm from './DayForm';
import TimesheetSummary from './TimesheetSummary';
import { Timesheet, DayData } from '../types';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimesheetForm: React.FC = () => {
  const [timesheet, setTimesheet] = useState<Timesheet>(() => {
    const savedTimesheet = localStorage.getItem('timesheet');
    return savedTimesheet ? JSON.parse(savedTimesheet) : {
      days: Object.fromEntries(days.map(day => [day, {}]))
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const filledDays = Object.values(timesheet.days).filter(day => Object.keys(day).length > 0 || day.noHoursToday).length;
    setProgress((filledDays / days.length) * 100);
    localStorage.setItem('timesheet', JSON.stringify(timesheet));
  }, [timesheet]);

  const handleDaySubmit = (day: string, data: DayData) => {
    setTimesheet(prev => ({
      days: {
        ...prev.days,
        [day]: data
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    // Simulate a submission delay
    setTimeout(() => {
      console.log('Timesheet submitted:', timesheet);
      setIsSubmitting(false);
      setShowSummary(false);
      toast.success(t('timesheetSubmittedSuccessfully'));
      // Clear local storage after successful submission
      localStorage.removeItem('timesheet');
      // Reset the form
      setTimesheet({
        days: Object.fromEntries(days.map(day => [day, {}]))
      });
    }, 1000);
  };

  return (
    <>
      <motion.div 
        className="mb-4 bg-blue-200 rounded-full h-3 dark:bg-blue-700 overflow-hidden shadow-inner"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      {!showSummary ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {days.map((day, index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <DayForm
                  day={day}
                  data={timesheet.days[day]}
                  onSubmit={handleDaySubmit}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {t('submitTimesheet')}
          </motion.button>
        </form>
      ) : (
        <TimesheetSummary 
          timesheet={timesheet} 
          onConfirm={handleConfirmSubmit} 
          onBack={() => setShowSummary(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default TimesheetForm;