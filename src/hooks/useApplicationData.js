import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysUrl = "/api/days";
    const appointmentsUrl = "/api/appointments";
    const interviewersUrl = "/api/interviewers";
    Promise.all([
      Promise.resolve(axios.get(daysUrl)),
      Promise.resolve(axios.get(appointmentsUrl)),
      Promise.resolve(axios.get(interviewersUrl)),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return daysOfWeek[day];
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);
    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots,
    };

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots,
      };
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots -1,
    }
  }

    let days = [...state.days];
    days[dayOfWeek] = day;

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments, days });
      return res;
    });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots +1,
    };

    let days = state.days;
    days[dayOfWeek] = day;

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({ ...state, appointments, days });
      return res;
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
