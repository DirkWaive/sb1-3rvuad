import React from 'react';
import { Timesheet } from '../types';

const TimesheetOutput: React.FC<{ timesheets: Timesheet[] }> = ({ timesheets }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
      {timesheets.map((timesheet, index) => (
        <div key={index} className="mb-8 last:mb-0">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Timesheet {index + 1}</h3>
          {Object.entries(timesheet.days).map(([day, data]) => (
            <div key={day} className="mb-4 last:mb-0">
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{day}</h4>
              <table className="w-full text-left border-collapse">
                <tbody>
                  {Object.entries(data).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-2 pr-4 font-medium text-gray-700 dark:text-gray-300">{key}</td>
                      <td className="py-2 text-gray-900 dark:text-white">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimesheetOutput;