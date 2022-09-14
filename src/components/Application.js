import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

const fakeAppointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};
fakeAppointments.length = 0;

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });
  
  const setDay = (day) => setState({ ...state, day});
  const setDays = (days) => setState((prev) => ({ ...prev, days}));



  const appointments = Object.values(getAppointmentsForDay(state, state.day)).map((appointment) => {
    const interview = getInterview(state, appointment.interview)
  
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });


  useEffect(() => {
    const urlGetDays = '/api/days';
    const urlGetAppointments = '/api/appointments';
    const urlGetInterviewers = '/api/interviewers';
    // Axios.get(url)
    //   .then((response) => {
    //     console.log(response);
    //     setDays([...response.data]);
    //   })

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
          appointments: all[1].data
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
