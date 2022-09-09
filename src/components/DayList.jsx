// src/components/DayList.jsx
import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {

  const dayList = props.days.map((day) => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    )
  });

  // alert(dayList);
  return (
    <ul>
      {dayList}
      {/* Added to verify the daylist item works: */}
      {/* <DayListItem 
        key={props.days[0].id}
        name={props.days[0].name} 
        spots={props.days[0].spots} 
        selected={props.days[0].name === props.day}
        setDay={props.setDay}  
      /> */}
    </ul>
  );
};
export default DayList;