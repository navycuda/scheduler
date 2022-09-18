import React from "react";


import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { 
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  updateAppointmentsByState
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

/** The meat and potatoes **/

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    editInterview,
    cancelInterview
  } = useApplicationData();


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
        editInterview={editInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
