// src/components/Appointment/index.jsx
import React from "react";
import './styles.scss';

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';


const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    // console.log('name', name);
    // console.log('interviewer', interviewer);
    // console.log('appointment', props);
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  };

  const cancel = () => {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  };


  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />
      { mode === EMPTY &&
        <Empty onAdd={() => transition(CREATE)}/>
      }
      { mode === SHOW && 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          />
        }
      { mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      { mode === SAVING &&
        <Status 
          message={'Saving'}
        />
      }
      { mode === DELETE &&
        <Status
          message={'Deleting'}
        />
      }
      { mode === CONFIRM &&
        <Confirm
          onCancel={back}
          cancelInterview={cancel}
        />
      }
    </article>
  )
};
export default Appointment;