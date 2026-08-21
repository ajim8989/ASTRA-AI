"use client";

import { useMemo, useState } from "react";

type CalendarEvent = {
  date: string;
  time: string;
  title: string;
  type: string;
};

const events: CalendarEvent[] = [
  {
    date: "2026-08-18",
    time: "10:00 AM",
    title: "Team Meeting",
    type: "Meeting",
  },
  {
    date: "2026-08-18",
    time: "12:30 PM",
    title: "AI Research",
    type: "Research",
  },
  {
    date: "2026-08-18",
    time: "03:00 PM",
    title: "Code Review",
    type: "Development",
  },
  {
    date: "2026-08-19",
    time: "11:00 AM",
    title: "Project Discussion",
    type: "Project",
  },
  {
    date: "2026-08-21",
    time: "02:00 PM",
    title: "AI Model Testing",
    type: "AI",
  },
  {
    date: "2026-08-25",
    time: "10:30 AM",
    title: "Research Presentation",
    type: "Research",
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function CalendarWidget() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    formatDate(today)
  );

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    // Previous month's visible days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, previousMonthDays - i),
        currentMonth: false,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        currentMonth: true,
      });
    }

    // Next month's visible days
    const remaining = 42 - days.length;

    for (let day = 1; day <= remaining; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        currentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  const selectedEvents = events.filter(
    (event) => event.date === selectedDate
  );

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  const goToToday = () => {
    const todayDate = new Date();

    setCurrentMonth(
      new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
    );

    setSelectedDate(formatDate(todayDate));
  };

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Calendar
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your meetings, research and project activities.
          </p>
        </div>

        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          Today
        </button>
      </div>

      {/* Calendar + Events */}
      <div
        className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]"
      >
        {/* Calendar */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              {monthNames[currentMonth.getMonth()]}{" "}
              {currentMonth.getFullYear()}
            </h3>

            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="flex items-center justify-center w-9 h-9 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                ←
              </button>

              <button
                onClick={goToNextMonth}
                className="flex items-center justify-center w-9 h-9 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                →
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div
            className="grid grid-cols-7 mb-2"
          >
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-2 text-xs font-semibold text-center text-slate-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((item, index) => {
              const dateString = formatDate(item.date);

              const isToday =
                dateString === formatDate(today);

              const isSelected =
                dateString === selectedDate;

              const hasEvent = events.some(
                (event) => event.date === dateString
              );

              return (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedDate(dateString)
                  }
                  className="relative flex items-center justify-center h-12"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight:
                        isToday || isSelected
                          ? "700"
                          : "400",
                      background: isSelected
                        ? "#2563eb"
                        : isToday
                        ? "#eff6ff"
                        : "transparent",
                      color: isSelected
                        ? "#ffffff"
                        : !item.currentMonth
                        ? "#cbd5e1"
                        : isToday
                        ? "#2563eb"
                        : "#334155",
                    }}
                  >
                    {item.date.getDate()}
                  </span>

                  {hasEvent && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#2563eb",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Events */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl">
          <div className="mb-5">
            <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
              Selected Day
            </p>

            <h3 className="mt-1 text-lg font-bold text-slate-900">
              {new Date(
                `${selectedDate}T00:00:00`
              ).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>

          {selectedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex items-center justify-center w-12 h-12 mb-3 text-xl rounded-xl bg-slate-100">
                📅
              </div>

              <p className="text-sm font-medium text-slate-700">
                No events
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Your schedule is clear for this day.
              </p>
            </div>
          ) : (
            <div>
              {selectedEvents.map((event) => (
                <div
                  key={`${event.date}-${event.time}-${event.title}`}
                  className="p-4 mb-3 border border-slate-100 rounded-xl bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600">
                      {event.time}
                    </span>

                    <span className="px-2 py-1 text-[10px] font-semibold text-slate-600 bg-white rounded-md">
                      {event.type}
                    </span>
                  </div>

                  <h4 className="mt-2 text-sm font-semibold text-slate-900">
                    {event.title}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}