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
  return null;
};