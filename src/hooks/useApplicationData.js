import axios from "axios";

import { useState, useEffect } from "react";

import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const daysUrl = "/api/days";
    const appointmentsUrl = "/api/appointments";
    const interviewersUrl = "/api/interviewers";
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      console.log("days", days);
      console.log("appointments", appointments);
      console.log("interviewers", interviewers);
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // setState({ ...state, appointments });
    return axios.put(
      `/api/appointments/${id}`,
      { interview }
    ).then (() => {
      setState({ ...state, appointments });
    });
  }

 
  const cancelInterview = (id, interview) => {
    return axios
      .delete(`/api/appointments/${id}`, { data: interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        setState({ ...state, appointments });
      })
      .catch((error) => {
        setState({ ...state, error: error.message });
        throw error;
      });
  };

  return { state, setDay, bookInterview, cancelInterview, dailyAppointments, interviewers };
}
