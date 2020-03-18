import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import "components/Appointment";

import "components/Application.scss";
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Amy Mansell",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Shuchita Mahey",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      },
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const appts = appointments.map(item => {
    return (
      <Appointment
        key={item.id}
        {...item}
      />
    )
  })

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
              days={days}
              day={day}
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
        {appts}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
