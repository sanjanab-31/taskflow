// Create a button component that accepts a label and an onClick handler as props. The button should have some basic styling using Tailwind CSS.

import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 hover:scale-110 hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;