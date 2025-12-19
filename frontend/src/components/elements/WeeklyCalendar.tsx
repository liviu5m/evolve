import React, { useMemo } from "react";

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function WeeklyCalendar({ selectedDate, onSelectDate }: Props) {
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  const weekDays = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });
  }, []);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex justify-between items-center">
        {weekDays.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className="flex flex-col items-center gap-2 relative p-2 min-w-[40px] cursor-pointer"
            >
              <span
                className={`text-xs font-medium ${
                  isSelected ? "text-[#FF6B6B]" : "text-gray-400"
                }`}
              >
                {dayLabels[index]}
              </span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-[#FF6B6B] text-white shadow-md shadow-red-200"
                    : isToday
                    ? "bg-gray-100 text-[#0F172A]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {date.getDate()}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}