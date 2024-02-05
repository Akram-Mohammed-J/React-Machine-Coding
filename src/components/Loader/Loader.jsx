import React from 'react';
import book from './book.gif';
import './Loader.css';

const Loader = ({ width = '20px', height = '20px' }) => {
  return (
    <div className="loader-container">
      <img src={book} style={{ width, height }} alt="" />
    </div>
  );
};

export default Loader;
