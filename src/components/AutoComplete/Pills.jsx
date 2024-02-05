import React from 'react';

const Pills = ({ image, name, onRemove }) => {
  return (
    <div className="pill">
      <img src={image} alt="" srcSet="" />
      <p>{name}</p>
      <i className="fa-solid fa-xmark" onClick={onRemove}></i>
    </div>
  );
};

export default Pills;
