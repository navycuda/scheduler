// src/components/Appointment/Form.jsx
import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = (props) => {
  const [ student, setStudent ] = useState(props.student || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder={props.student}
            /*
              This must be a controlled component
              your code goes here
            */
           value={student}
           onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger >Cancel</Button>
          <Button confirm >Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
