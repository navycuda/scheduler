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
import Error from "./Error";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_EDIT = 'ERROR_EDIT';

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
      })
      .catch(() => {
        transition(ERROR_SAVE);
      });
  };

  const cancel = () => {
    transition(DELETE);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  };

  const edit = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.editInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_EDIT);
      });
  };

  const doubleBack = () => {
    back();
    back();
  }
  

  console.log(`Appointment id: ${props.id} props`, props);

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
          onEdit={() => transition(EDIT)}
        />
      }
      { mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      { mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          instructor={props.interview.instructor}
          onCancel={back}
          onSave={edit} 
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
      { mode === ERROR_SAVE &&
        <Error
          message={'Error saving new!'}
          onClose={doubleBack}
        />
      }
      { mode === ERROR_EDIT &&
        <Error
          message={'Error saving edit!'}
          onClose={doubleBack}
        />
      }      
    </article>
  )
};
export default Appointment;