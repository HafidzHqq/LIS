import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'gray';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'blue', 
  size = 'sm' 
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'green':
        return 'bg-[#34c759]/15 text-[#248a3d] border-[#34c759]/30';
      case 'amber':
        return 'bg-[#ff9f0a]/15 text-[#b26a00] border-[#ff9f0a]/30';
      case 'red':
        return 'bg-[#ff3b30]/15 text-[#d70015] border-[#ff3b30]/30';
      case 'purple':
        return 'bg-[#af52de]/15 text-[#8944ab] border-[#af52de]/30';
      case 'gray':
        return 'bg-[#7a7a7a]/15 text-[#48484a] border-[#7a7a7a]/30';
      default:
        return 'bg-[#0066cc]/15 text-[#0066cc] border-[#0066cc]/30';
    }
  };

  const sizeStyles = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-semibold rounded-[4px] border tracking-tight ${getStyles()} ${sizeStyles}`}>
      {children}
    </span>
  );
};
