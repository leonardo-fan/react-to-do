import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

// array of the filter names (keys) from FILTER_MAP
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  // Hooks
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  // Add a new task
  const addTask = name => {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // Toggle task completion
  // will be called onChange for changes to a specific ToDo's checkbox with id
  const toggleTaskCompleted = id => {
    const updatedTasks = tasks.map(task => { // updatedTasks constant that maps over the original tasks array.
      if (id === task.id) {
        return {...task, completed: !task.completed} // object spread syntax creates a new object, and toggles the checked property of that object before returning it.
      }
      return task; // If it doesn’t match, the original object is returned.
    })
    setTasks(updatedTasks); // setTasks() is called with this updatedTasks array in order to update the state.
  }

  const deleteTask = id => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  const editTask = (id, newName) => {
    const editedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTasks);
  }

  // Map a list of Todo components with all data and function props
  // These are filtered based on the filter state (arrow functions populated from FILTER_MAP object)
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  // Map a list of FilterButton components with all data and function props 
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  // Tasks Remaining Header string
  const tasksNoun = taskList.length > 1? 'Tasks' : 'Task';
  const headingText = `${taskList.length} ${tasksNoun} Remaining`;

  return (
    <div className="todoapp">
      <h1>To Do List</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
