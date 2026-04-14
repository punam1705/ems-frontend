import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {

  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white shadow">

      <div className="w-full px-4 md:px-8 lg:px-16 py-3 flex justify-between items-center">

        <p
          onClick={() => navigate('/')}
          className="text-base sm:text-lg font-semibold cursor-pointer"
        >
          Employee Management System
        </p>

      </div>

    </header>
  );
};

export default HeaderComponent;