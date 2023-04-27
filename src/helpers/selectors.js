// map through the days array and find the day that matches the day name
export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find((dayObj) => dayObj.name === day);
  if (!dayObj) {
    return [];
  }
  const appointments = dayObj.appointments.map((id) => state.appointments[id]);
  return appointments;
}

// map through the interviewers array and find the interviewer that matches the interviewer name
export function getInterviewersForDay(state, name) {
  const dayObj = state.days.find((dayObj) => dayObj.name === name);
  if (!dayObj || !Array.isArray(dayObj.interviewers)) {
    return [];
  }
  const interviewersFromDays = dayObj.interviewers;
  let interviewObj = [];

  for (let interviewer of interviewersFromDays) {
    interviewObj.push(state.interviewers[interviewer]);
  }
  return interviewObj;
}

// return an object with the student name and interviewer object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return interviewObj;
}
