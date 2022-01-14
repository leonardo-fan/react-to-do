import React, { useState } from "react";

export default function Form(props) {
  // useState() creates a piece of state for a component - a type of hook, 
  // its only parameter determines the initial value of that state. 
  // It returns two things: the state, and a function that can be used to update the state later.
  // const [ , ] uses array destructing to capture both returns as separate variables
  const [name, setName] = useState("");

  const handleChange = e => setName(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    props.addTask(name); // callback prop from App.js
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
      <label htmlFor="new-todo-input" className="label__lg">
        What needs to be done?
      </label>
      </h2>
      <input 
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        placeholder="Type task here"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}