import React from 'react';
import { Timesheet } from '../types';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface TimesheetSummaryProps {
  timesheet: Timesheet;
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const TimesheetSummary: React.FC<TimesheetSummaryProps> = ({ timesheet, onConfirm, onBack, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform perspective-1000 hover:scale-[1.01] transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('timesheetSummary')}</h2>
      {Object.entries(timesheet.days).map(([day, data]) => (
        <div key={day} className="mb-4 last:mb-0 bg-blue-50 dark:bg-blue-900 p-4 rounded-md shadow-md transform hover:scale-[1.02] transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t(day.toLowerCase())}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><strong>{t('fullName')}:</strong> {data.fullName}</p>
            <p><strong>{t('roadAddress')}:</strong> {data.address}</p>
            <p><strong>{t('contractNumber')}:</strong> {data.contractNumber}</p>
            <p><strong>{t('shifts')}:</strong> {data.shifts?.join(', ')}</p>
            <p><strong>{t('contractor')}:</strong> {data.contractor}</p>
            <p><strong>{t('jobType')}:</strong> {data.jobType}</p>
            <p><strong>{t('transport')}:</strong> {data.transport}</p>
            <p><strong>{t('fuelCost')}:</strong> {data.fuelCost}</p>
          </div>
        </div>
      ))}
      <div className="mt-6 flex justify-between">
        <motion.button
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-300 shadow-md transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('back')}
        </motion.button>
        <motion.button
          onClick={onConfirm}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isSubmitting ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          {isSubmitting ? t('submitting') : t('confirmSubmit')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TimesheetSummary;