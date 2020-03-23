import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const indexOfDay = function (id) {
    let index = null;
    switch (true) {
      case id <= 5: index = 0
        break;
      case id <= 10: index = 1
        break;
      case id <= 15: index = 2
        break;
      case id <= 20: index = 3
        break;
      case id <= 25: index = 4
        break;
      default: id = null;
    }
    return index;
  }
  const spotsLeft = function (appts) {
    let count = 0;
    for (const item in appts) {
      if (appts[item].interview === null) {
        count++;
      }
    }
    return count;
  }

  const bookInterview = function (id, interview) {
    let days = state.days
      .map(
        element => element.id === indexOfDay(id)
          ? { ...element, spots: spotsLeft(appointments) }
          : element);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return (
      axios.put(`/api/appointments/${id}`, { interview })
        .then(() => {
          setState({
            ...state,
            appointments,
            days
          })
        })
    )
  };

  const cancelInterview = function (id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let days = state.days
      .map(
        element => element.id === indexOfDay(id)
          ? { ...element, spots: spotsLeft(appointments) }
          : element);

    return (
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({
            ...state,
            appointments,
            days
          })
        })
    )
  };

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

  return { state, setDay, bookInterview, cancelInterview }
}