import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
import "components/Appointment";

import "components/Application.scss";
import Appointment from "components/Appointment";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, { interview })
        .then(() => {
          setState({
            ...state,
            appointments
          })
        })
    )

  }
  const schedule = appointments.map(item => {
    const interview = getInterview(state, item.interview)

    return (
      <Appointment
        key={item.id}
        {...item}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    )
  });


  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([
      promise1,
      promise2,
      promise3,
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {<React.Fragment>
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              id={state.days.id}
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </React.Fragment>
        }
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}
