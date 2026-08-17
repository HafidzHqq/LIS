import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'white' | 'parchment' | 'dark';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  variant = 'white' 
}) => {
  const bgStyles = variant === 'dark'
    ? 'bg-[#272729] text-white border-[#333333]'
    : variant === 'parchment'
      ? 'bg-[#f5f5f7] text-[#1d1d1f] border-black/[0.06]'
      : 'bg-white text-[#1d1d1f] border-black/[0.06] shadow-sm';

  return (
    <div 
      onClick={onClick}
      className={`rounded-[4px] border p-4 transition-all duration-200 ${bgStyles} ${
        onClick ? 'cursor-pointer hover:border-[#0066cc]/40 active:scale-[0.98]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
