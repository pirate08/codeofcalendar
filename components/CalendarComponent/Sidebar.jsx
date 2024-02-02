import React from 'react';

const Sidebar = ({ isSidebarVisible }) => {
  return (
    <div
      className={`absolute top-0 right-72 h-full opacity-60 w-72 bg-gray-800 transform ${
        isSidebarVisible ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
      {/* Sidebar content */}
      <div className='p-4 text-white'>
        {/* Add your sidebar content here */}
        <h1>Hello world</h1>
      </div>
    </div>
  );
};

export default Sidebar;
