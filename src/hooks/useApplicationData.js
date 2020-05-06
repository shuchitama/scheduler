import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const bookInterview = function (id, interview) {
    // check if an existing appointment is being edited or a new one is being created
    const editing = function () {
      if (state.appointments[id].interview === null) {
        return false;
      } else {
        return true;
      }
    };

    // spots left should not change if an appointment is being edited, but should change if a new one is being created
    const spotsLeft = function (appts) {
      let count = 0;
      for (const item in appts) {
        if (appts[item].interview === null) {
          count++;
        }
      }
      if (editing()) {
        return count;
      } else {
        return count - 1;
      }
    };

    // update the current appointment object to reflect new appointment data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // update the entire appointments object with new appointment data
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const activeDay = state.days.find((day) => {
      return day.name === state.day;
    });
    const daysAppts = getAppointmentsForDay(state, activeDay.name);
    const numSpots = spotsLeft(daysAppts);

    const updatedDay = {
      ...activeDay,
      spots: numSpots,
    };
    const updatedDays = state.days.map((day) => {
      if (day.name === updatedDay.name) {
        return updatedDay;
      }
      return day;
    });
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const activeDay = state.days.find((day) => {
      return day.name === state.day;
    });
    const updatedDay = {
      ...activeDay,
      spots: activeDay.spots + 1,
    };
    const updatedDays = state.days.map((day) => {
      if (day.name === updatedDay.name) {
        return updatedDay;
      }
      return day;
    });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  };

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
