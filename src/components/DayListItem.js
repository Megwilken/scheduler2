import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = (spots) => {
  if (spots < 1) {
    return "no spots remaining";
  }
  if (spots === 1) {
    return "1 spot remaining";
  }
  return `${spots} spots remaining`;
};

export default function DayListItem(props) {
  const availability = formatSpots(props.spots);
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });
  return (
    <li
      className={dayClass}
      selected={props.selected}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
