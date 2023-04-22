import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(
    props.defaultInterviewer || props.interviewer || null
  );

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    setError("");
    props.onCancel();
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} alt="Add">
          <input
            className="appointment__create-input text--semi-bold"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>

        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(interviewer) => setInterviewer(interviewer)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
