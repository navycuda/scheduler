// src/components/Appointment/Empty.jsx
import React from 'react';

const Empty = (props) => {
  return (
    <main className='appointment__add'>
      <img
        className='appointment__add-button'
        src='images/add.png'
        alt='add'
        onClick={props.onAdd}
      />
    </main>
  );
};

export default Empty;
