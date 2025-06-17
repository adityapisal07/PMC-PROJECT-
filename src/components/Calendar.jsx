import React from 'react';

function Calendar() {
  const today = new Date().toDateString();

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-2">📅 Calendar Component</h2>
      <p className="text-gray-700">Today is: <span className="font-medium">{today}</span></p>
      <div className="mt-4 text-sm text-gray-500">
        (This is a simple static calendar placeholder. You can enhance it with a real calendar library like <strong>react-calendar</strong> or <strong>fullcalendar-react</strong>.)
      </div>
    </div>
  );
}

export default Calendar;
