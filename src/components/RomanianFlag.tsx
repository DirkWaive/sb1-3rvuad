import React from 'react';

const RomanianFlag: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="600" fill="#002B7F"/>
      <rect width="600" height="600" fill="#FCD116"/>
      <rect width="300" height="600" fill="#CE1126"/>
    </svg>
  );
};

export default RomanianFlag;