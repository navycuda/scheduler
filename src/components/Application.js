import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { 
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

/** The meat and potatoes **/

export default function Application(props) {
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
        const updatedState = {
          ...state,
          appointments:{
            ...state.appointments,
            [id]: {
              ...state.appointments[id],
              interview: null
            }
          }
        }
        setState(updatedState);
        console.log(updatedState);
      });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios.put(updateAppointments(id), { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
      });
  };

  const setDay = (day) => setState({ ...state, day});
  const interviewers = getInterviewersForDay(state);
  console.log('interviewers', interviewers);
  const appointments = Object.values(getAppointmentsForDay(state, state.day)).map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={state.days}
          value={state.day}
          onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
      </section>
    </main>
  );
}
