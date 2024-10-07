import React, { useState } from 'react';
import { Timesheet } from '../types';
import { useTranslation } from 'react-i18next';

const EmailForm: React.FC<{ timesheets: Timesheet[] }> = ({ timesheets }) => {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Here you would typically send the email with the timesheet data
    console.log('Sending email to:', email);
    console.log('Timesheet data:', timesheets);
    alert(`Email sent to ${email}`);
    setEmail('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('sendTimesheet')}</h3>
      <div className="flex items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('recipientEmail')}
          required
          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-l-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition-colors"
        >
          {t('sendTimesheet')}
        </button>
      </div>
    </div>
  );
};

export default EmailForm;