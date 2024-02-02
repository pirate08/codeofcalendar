'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import Sidebar from './Sidebar';

function getDatesOfMonths(year, month) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const dates = [];
  const currentDate = new Date(startDate);

  const startDay = startDate.getDay();

  for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
    dates.push(null);
  }

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

const DayName = [
  {
    id: 1,
    name: 'Mon',
  },
  {
    id: 2,
    name: 'Tue',
  },
  {
    id: 3,
    name: 'Wed',
  },
  {
    id: 4,
    name: 'Thurs',
  },
  {
    id: 5,
    name: 'Fri',
  },
  {
    id: 6,
    name: 'Sat',
  },
  {
    id: 7,
    name: 'Sun',
  },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allDatesofMonths, setAllDatesofMonths] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    // setSelectedDate(new Date());
    const dates = getDatesOfMonths(
      selectedDate.getFullYear(),
      selectedDate.getMonth()
    );
    setAllDatesofMonths(dates);
  }, [selectedDate]);

  const currentMonth = selectedDate.toLocaleString('default', {
    month: 'long',
  });
  const currentYear = selectedDate.getFullYear();

  // --togglebar to show the sidebar--
  const togglebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // --Previous Button--
  const prevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
    // console.log('Hello clicked...');
  };

  // --Next Button--
  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
    // console.log('Hello clicked right...');
  };
  // console.log(new Date().getDate)

  // const today = new Date().getDate();
  // console.log(today);

  return (
    <div className='overflow-x-auto'>
      {/* --Header-- */}
      <div className='py-5 px-4 md:px-20 flex flex-col md:flex-row items-center shadow-xl'>
        <div className='mb-4 md:mb-0'>
          <Image src='/logo.png' width={100} height={100} alt='Logo...' />
        </div>
        <div className='flex-1 text-center md:text-left'>
          <h1 className='text-3xl font-bold text-white mb-2 md:mb-0'>
            Calendar
          </h1>
        </div>
      </div>
      {/* --Body Section-- */}
      <div className='flex flex-col items-center justify-center h-screen px-4 md:px-10'>
        <div className='bg-white w-full p-5 mb-5 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <button
              className='rounded-md text-white px-4 py-2 md:py-1 bg-gradient-to-r from-violet-400 to-fuchsia-500 cursor-pointer hover:scale-105 duration-200'
              onClick={togglebar}>
              Add Events
            </button>
          </div>
          <div>
            <span className='text-xl'>{`${currentMonth} ${currentYear}`}</span>
          </div>
          <div className='flex items-center gap-4'>
            <span
              className='text-xl text-red-700 cursor-pointer transition-transform transform hover:-translate-x-1'
              onClick={prevMonth}>
              <FaArrowCircleLeft />
            </span>
            <span
              className='text-xl text-green-700 cursor-pointer transition-transform transform hover:translate-x-1'
              onClick={nextMonth}>
              <FaArrowCircleRight />
            </span>
          </div>
        </div>
        <div className='bg-white w-full p-6 rounded-lg shadow-md grid grid-cols-7 gap-4'>
          {/* --DayName-- */}
          {DayName.map((day) => {
            return (
              <span
                key={day.id}
                className='flex items-center justify-center text-sm md:text-xl'>
                {day.name}
              </span>
            );
          })}
          {/* Display the dates in a grid */}
          {allDatesofMonths.map((date, index) => (
            <p
              key={index}
              className={`border p-2 rounded-full text-center ${
                date &&
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth()
                  ? 'text-white bg-gradient-to-r from-violet-400 to-fuchsia-500 cursor-pointer hover:scale-105 duration-200'
                  : 'hover:bg-gray-200 cursor-pointer'
              }`}>
              {date && date.getDate()}
            </p>
          ))}
        </div>
      </div>
      {/* --Showing the sidebar here-- */}
      {isSidebarVisible && <Sidebar />}
    </div>
  );
};

export default Calendar;
