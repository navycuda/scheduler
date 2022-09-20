import Axios from "axios";
import { useState, useEffect } from "react";
import { 
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  updateAppointmentsByState
} from "../helpers/selectors";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // Used for both cancelInterview and bookInterview
  const updateAppointments = (id) => `/api/appointments/${id}`;
  
  

  const cancelInterview = (id) => {
    return Axios.delete(updateAppointments(id))
      .then(() => {
        setState((prev) => ({
          
          ...prev,
          appointments:{
            ...prev.appointments,
            [id]: {
              ...prev.appointments[id],
              interview: null
            }
          },
          days: prev.days.map((day) => {
            if (day.name === prev.day) {
              day.spots += 1;
            }
            return day;
          })
        }));
      });
  };

  const bookInterview = (id, interview) => {
    const appointments = updateAppointmentsByState(state, id, interview);

    return Axios.put(updateAppointments(id), { interview })
      .then(() => {
        setState((prev) => ({
          ...prev,
          days: prev.days.map((day) => {
            if (day.name === prev.day) {
              day.spots -= 1;
            }
            return day;
          }),
          appointments
        }));
      });
  };

  const editInterview = async (id, interview) => {
    await cancelInterview(id);
    await bookInterview(id, interview);
  };


  useEffect(() => {
    const urlGetDays = '/api/days';
    const urlGetAppointments = '/api/appointments';
    const urlGetInterviewers = '/api/interviewers';

    Promise.all([
      Axios.get(urlGetDays),
      Axios.get(urlGetAppointments),
      Axios.get(urlGetInterviewers)
    ])
      .then((all) => {
        for (const each of all) {
          console.log(each.data);
        };
        console.log(all);
        setState((previous) => ({
          ...previous,
          days: all[0].data,
          appointments: all[1].data,
          interviewers:all[2].data
        }));
      });
  }, []);

  const setDay = (day) => setState({ ...state, day});

  return {
    state,
    setDay,
    bookInterview,
    editInterview,
    cancelInterview
  }

};