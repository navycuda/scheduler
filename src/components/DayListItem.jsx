// src/components/DayListItem.jsx
import React from "react";
import 'components/DayListItem.scss';
import classNames from "classnames";

const DayListItem = (props) => {
  const buttonClass = classNames("day-list__item", {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });


  const formatSpots = (spots) => {
    if (spots === 1) {
      return '1 spot remaining';
    } else if (spots > 1) {
      return `${spots} spots remaining`;
    } else {
      return 'no spots remaining';
    }
  };




  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={buttonClass}
      >
      <h2 className="text--regular">
        {props.name}
      </h2>
      <h3 className="text--light">
        {formatSpots(props.spots)}
      </h3>
    </li>
  );
};
export default DayListItem;