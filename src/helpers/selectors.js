// src/helpers/selectors.js
export const getAppointmentsByIds = (appointments, ids) => {
  return ids.map((id) => {
    return appointments[id];
  });
};

export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find(({ name }) => name === day);
  if (selectedDay) {
    console.log('selectedDay: ', selectedDay);
    console.log('day', day);
    return getAppointmentsByIds(state.appointments, selectedDay.appointments);
  }
  return [];
};