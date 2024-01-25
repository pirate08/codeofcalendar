'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import Link from 'next/link';

function getDatesOfMonths(year, month) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

const DayName = [
  {
    id: 1,
    name: 'Monday',
  },
  {
    id: 2,
    name: 'Tuesday',
  },
  {
    id: 3,
    name: 'Wednesday',
  },
  {
    id: 4,
    name: 'Thursday',
  },
  {
    id: 5,
    name: 'Friday',
  },
  {
    id: 6,
    name: 'Saturday',
  },
  {
    id: 7,
    name: 'Sunday',
  },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allDatesofMonths, setAllDatesofMonths] = useState([]);

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
    <div>
      {/* --Header-- */}
      <div className='py-5 px-20 flex items-center shadow-xl'>
        <Image src='/logo.png' width={100} height={100} alt='Logo...' />
        {/* --Text-- */}
        <h1 className='text-3xl font-bold text-white'>Calendar</h1>
      </div>
      {/* --Body Section-- */}
      <div className='flex flex-col items-center justify-center h-screen px-10'>
        <div className='bg-white w-full p-4 mb-5 rounded-lg shadow-md flex justify-around items-center'>
          <div>
            <Link href='./EventSidebar'>
              {' '}
              <button className='rounded-md text-white px-4 py-1 bg-gradient-to-r from-violet-400 to-fuchsia-500 cursor-pointer hover:scale-105 duration-200'>
                Add Events
              </button>
            </Link>
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
              <span key={day.id} className='text-center text-lg'>
                {day.name}
              </span>
            );
          })}
          {/* Display the dates in a grid */}
          {allDatesofMonths.map((date, index) => (
            <p
              key={index}
              className={`border p-2 rounded-full text-center ${
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth()
                  ? 'text-white bg-gradient-to-r from-violet-400 to-fuchsia-500 cursor-pointer hover:scale-105 duration-200'
                  : 'hover:bg-gray-200 cursor-pointer'
              }`}>
              {date.getDate()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
