import React from 'react';

const ListItem = ({ image, name, onSelect }) => {
  return (
    <div className="listItem" onClick={onSelect}>
      <img src={image} alt="" />
      <p>{name}</p>
    </div>
  );
};

export default ListItem;
