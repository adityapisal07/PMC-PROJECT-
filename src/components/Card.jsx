import React from 'react';

function Card({ title, description, date }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-gray-600">{description}</p>
      {date && (
        <p className="text-sm text-gray-400 mt-2">📅 {date}</p>
      )}
    </div>
  );
}

export default Card;
