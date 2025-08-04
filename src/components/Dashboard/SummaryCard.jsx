import React from 'react';

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-full ml-10 mb-4"> 
      <div className="text-5xl text-blue-500 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{text}</h3>
        <p className="text-2xl text-gray-600">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;