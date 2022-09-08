// src/components/DayListItem.jsx
import React from "react";
import 'components/DayListItem.scss';
import classNames from "classnames";

const DayListItem = (props) => {
  const buttonClass = classNames("day-list__item", {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });


  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={buttonClass}
      >
      <h2 className="text--regular">
        Day Name
      </h2>
      <h3 className="text--light">
        {props.spots} spots remaining
      </h3>
    </li>
  );
};
export default DayListItem;