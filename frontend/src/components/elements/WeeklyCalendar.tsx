import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useMemo } from "react";

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function WeeklyCalendar({ selectedDate, onSelectDate }: Props) {
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  const weekDays = useMemo(() => {
    const baseDate = new Date(selectedDate);
    const dayOfWeek = baseDate.getDay();

    const diff = baseDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    const monday = new Date(baseDate.getFullYear(), baseDate.getMonth(), diff);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });
  }, [selectedDate]);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 mb-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FF6B6B]" />
          <span className="font-bold text-gray-800">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <input
          type="date"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none w-full sm:w-auto"
          value={selectedDate.toLocaleDateString("en-CA")}
          onChange={(e) => {
            const dateString = e.target.value;
            if (!dateString) return;
            const [year, month, day] = dateString.split("-").map(Number);
            const newLocalDate = new Date(year, month - 1, day);
            onSelectDate(newLocalDate);
          }}
        />
      </div>

      <div className="flex justify-between items-center gap-1 sm:gap-2">
        <button
          onClick={() => {
            const next = new Date(selectedDate);
            next.setDate(selectedDate.getDate() - 1);
            onSelectDate(next);
          }}
          className="p-1 rounded-full hover:bg-gray-100 hover:text-[#FF6B6B] cursor-pointer"
        >
          <ArrowLeft />
        </button>
        {weekDays.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className="flex flex-col items-center gap-1 sm:gap-2 p-1.5 sm:p-2 min-w-[34px] sm:min-w-[40px] cursor-pointer group"
            >
              <span
                className={`text-xs font-bold transition-colors ${
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
                      ? "bg-red-50 text-[#FF6B6B] border border-red-100"
                      : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {date.getDate()}
              </div>
            </button>
          );
        })}
        <button
          onClick={() => {
            const prev = new Date(selectedDate);
            prev.setDate(selectedDate.getDate() + 1);
            onSelectDate(prev);
          }}
          className="hover:scale-110 hover:text-[#FF6B6B] cursor-pointer"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
