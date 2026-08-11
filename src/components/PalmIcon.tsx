import React from 'react';

interface PalmIconProps {
  className?: string;
  size?: number;
}

export const PalmIcon: React.FC<PalmIconProps> = ({ className = "w-6 h-6", size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Palm Trunk */}
      <path d="M12 21V11" strokeWidth="2.2" />
      <path d="M10.5 21c.5-2 1.5-4 1.5-6" />
      <path d="M13.5 21c-.5-2-1.5-4-1.5-6" />
      
      {/* Palm Fronds Center & Sides */}
      <path d="M12 11C8.5 7.5 5 8 2.5 9.5c3 2 6.5 2 9.5 1.5Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 11C15.5 7.5 19 8 21.5 9.5c-3 2-6.5 2-9.5 1.5Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 11C9 6.5 6.5 3 7 1c2.5 1.5 4.5 5 5 10Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 11C15 6.5 17.5 3 17 1c-2.5 1.5-4.5 5-5 10Z" fill="currentColor" fillOpacity="0.2" />
      
      {/* Frond Arch Lines */}
      <path d="M12 11C8 8.5 4 8.5 2 10" />
      <path d="M12 11C16 8.5 20 8.5 22 10" />
      <path d="M12 11C8.5 6.5 5.5 3.5 6 1.5" />
      <path d="M12 11C15.5 6.5 18.5 3.5 18 1.5" />
      <path d="M12 11V2" />

      {/* Dates/Fruit Accents */}
      <circle cx="10.5" cy="12" r="1" fill="currentColor" />
      <circle cx="13.5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
};
