import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { DayData } from '../types';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const shifts = [0.5, 1, 1.5, 2, 2.5, 3];

const DayForm: React.FC<{ 
  day: string; 
  data: DayData; 
  onSubmit: (day: string, data: DayData) => void 
}> = ({ day, data, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localData, setLocalData] = useState<DayData>(data);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [noHoursToday, setNoHoursToday] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLocalData(data);
    setIsSaved(Object.keys(data).length > 0);
    setNoHoursToday(data.noHoursToday || false);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSubmit(day, { ...localData, noHoursToday });
      setIsSaving(false);
      setIsSaved(true);
    }, 500);
  };

  const handleChange = (field: keyof DayData, value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleNoHoursToggle = () => {
    setNoHoursToday(!noHoursToday);
    setIsSaved(false);
  };

  const isDataFilled = Object.values(localData).some(value => 
    value !== undefined && value !== '' && 
    (Array.isArray(value) ? value.length > 0 : true)
  ) || noHoursToday;

  const isWeekend = day === 'Saturday' || day === 'Sunday';

  return (
    <div className={`border border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden shadow-lg mb-4 ${isWeekend ? 'bg-blue-50 dark:bg-blue-900' : 'bg-blue-50 dark:bg-blue-900'} transform perspective-1000 hover:scale-[1.02] transition-all duration-300`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 text-left transition-all duration-300 flex justify-between items-center ${
          isSaved
            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white dark:from-green-600 dark:to-green-700'
            : isOpen
            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white dark:from-blue-600 dark:to-blue-700'
            : 'bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 dark:from-blue-800 dark:to-blue-900 dark:text-white'
        }`}
      >
        <span className="font-semibold">{t(day.toLowerCase())}</span>
        <div className="flex items-center">
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mr-2 bg-white dark:bg-blue-200 rounded-full p-1 shadow-md"
            >
              <Check size={16} className="text-green-600 dark:text-green-700" />
            </motion.div>
          )}
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-blue-800">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id={`no-hours-${day}`}
                  checked={noHoursToday}
                  onChange={handleNoHoursToggle}
                  className="mr-2"
                />
                <label htmlFor={`no-hours-${day}`} className="text-gray-700 dark:text-gray-300">
                  {t('noHoursToday')}
                </label>
              </div>

              {!noHoursToday && (
                <>
                  <input
                    type="text"
                    placeholder={t('fullName')}
                    value={localData.fullName || ''}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner transform transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                  />
                  <input
                    type="text"
                    placeholder={t('roadAddress')}
                    value={localData.address || ''}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner transform transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                  />
                  <input
                    type="text"
                    placeholder={t('contractNumber')}
                    value={localData.contractNumber || ''}
                    onChange={(e) => handleChange('contractNumber', e.target.value)}
                    className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner transform transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                  />
                  
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700 dark:text-gray-300">{t('shifts').toUpperCase()}</label>
                    <div className="flex flex-wrap gap-2">
                      {shifts.map((shift) => (
                        <button
                          key={shift}
                          type="button"
                          onClick={() => {
                            const newShifts = localData.shifts?.includes(shift)
                              ? localData.shifts.filter((s) => s !== shift)
                              : [...(localData.shifts || []), shift];
                            handleChange('shifts', newShifts);
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-all duration-300 transform hover:scale-110 ${
                            localData.shifts?.includes(shift)
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-700'
                          }`}
                        >
                          {shift}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700 dark:text-gray-300">{t('contractor').toUpperCase()}</label>
                    <div className="flex gap-2">
                      {['CONWAY', 'RINEY'].map((contractor) => (
                        <button
                          key={contractor}
                          type="button"
                          onClick={() => handleChange('contractor', contractor)}
                          className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                            localData.contractor === contractor
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-700'
                          }`}
                        >
                          {contractor}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700 dark:text-gray-300">{t('jobType').toUpperCase()}</label>
                    <div className="flex gap-2">
                      {['REACTIVE', 'PLANNED'].map((jobType) => (
                        <button
                          key={jobType}
                          type="button"
                          onClick={() => handleChange('jobType', jobType)}
                          className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                            localData.jobType === jobType
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-700'
                          }`}
                        >
                          {jobType}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700 dark:text-gray-300">{t('transport').toUpperCase()}</label>
                    <div className="flex gap-2">
                      {['IONA-CE', 'CONWAY'].map((transport) => (
                        <button
                          key={transport}
                          type="button"
                          onClick={() => handleChange('transport', transport)}
                          className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                            localData.transport === transport
                              ? 'bg-blue-500 text-white shadow-md'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-700'
                          }`}
                        >
                          {transport}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <input
                    type="number"
                    placeholder={t('enterFuelCost')}
                    value={localData.fuelCost || ''}
                    onChange={(e) => handleChange('fuelCost', e.target.value)}
                    className="w-full p-2 border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-inner transform transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                  />
                </>
              )}
              
              <motion.button
                type="button"
                onClick={handleSubmit}
                className={`w-full text-white p-3 rounded-md transition-all duration-300 mt-6 shadow-md transform hover:scale-105 ${
                  isSaved ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isSaving ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                {isSaving ? t('saving') : isSaved ? t('update') : `${t('save')} ${t(day.toLowerCase())}`}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DayForm;