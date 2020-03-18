import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const { days, day, setDay } = props;
  const dayList = days.map(item => {
    return (
      <DayListItem
        key={item.id}
        id={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === day}
        setDay={setDay}
      />
    );
  });
  return (
    <ul>
      {dayList}
    </ul>
  )
}