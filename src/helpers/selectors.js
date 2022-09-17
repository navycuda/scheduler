// src/helpers/selectors.js
export const getAppointmentsByIds = (appointments, ids) => {
  return ids.map((id) => {
    return appointments[id];
  });
};

export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find(({ name }) => name === day);
  return !selectedDay ? [] : getAppointmentsByIds(state.appointments, selectedDay.appointments);
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    interviewer,
    student: interview.student
  }
};

export const getInterviewersForDay = (state) => {
  const selectedDay = state.days.find(({ name }) => name === state.day);
  if (state.days.length === 0 || !selectedDay) {
    return [];
  }

  const interviewers = [];
  selectedDay.interviewers.forEach((appointment) => {
    interviewers.push(state.interviewers[appointment]);
  });
  return interviewers;
};