import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: string;
  trendPositive?: boolean;
  onClick?: () => void;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = '#0066cc',
  trend,
  trendPositive = true,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[4px] border border-black/[0.06] p-3.5 shadow-sm transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:border-[#0066cc]/40 active:scale-[0.97]' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-[#7a7a7a] tracking-tight truncate">
          {title}
        </span>
        <div 
          className="w-7 h-7 rounded-[4px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${iconColor}15`, color: iconColor }}
        >
          <Icon className="w-4 h-4 stroke-[2]" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-1">
        <span className="text-xl font-bold tracking-tight text-[#1d1d1f] font-apple-display">
          {value}
        </span>
        {trend && (
          <span className={`text-[10px] font-semibold flex items-center gap-0.5 ${
            trendPositive ? 'text-[#34c759]' : 'text-[#ff3b30]'
          }`}>
            {trendPositive ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <span className="text-[10px] text-[#7a7a7a] mt-0.5 truncate">
          {subtitle}
        </span>
      )}
    </div>
  );
};
