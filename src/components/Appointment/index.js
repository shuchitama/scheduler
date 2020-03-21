import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

import './styles.scss';


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    transition(SAVING, true)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => console.log(error))
  }

  const del = function () {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(error => console.log(error))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => { transition(EDIT) }}
          onDelete={() => { transition(CONFIRM) }}
        />
      }
      {mode === CREATE &&
        <Form
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === SAVING &&
        <Status
          message="Saving"
        />
      }
      {mode === DELETING &&
        <Status
          message="Deleting"
        />
      }
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={del}
          onCancel={back}
        />
      }
      {mode === EDIT &&
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      }
    </article>
  )
}