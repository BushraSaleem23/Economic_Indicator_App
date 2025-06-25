import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const today = new Date().toISOString().split('T')[0];
  const minDate = '2020-01-01'; // Minimum date for historical data

  return (
    <div className="flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-600">
      <Calendar className="h-5 w-5 text-blue-400" />
      <div className="flex flex-col">
        <label htmlFor="date-picker" className="text-xs text-gray-400 mb-1">
          Select Date
        </label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={minDate}
          max={today}
          className="bg-transparent text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
        />
      </div>
    </div>
  );
};

export default DatePicker;