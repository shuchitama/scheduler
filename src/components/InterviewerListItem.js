import React from "react";
import classnames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, selected, setInterviewer } = props;
  const interviewerClass = classnames("interviewers__item-image", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(name)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {selected && name}
    </li>
  )
}