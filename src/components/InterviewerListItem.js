import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classnames("interviewers__item-image", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}