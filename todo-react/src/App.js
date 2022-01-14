import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  // Hook to modify tasks
  const [tasks, setTasks] = useState(props.tasks);

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
  };

  // Feed Todo components all tasks
  const taskList = tasks.map(task => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id} 
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
      />
    )
  );

  // Tasks Remaining Header string
  const tasksNoun = taskList.length > 1? 'Tasks' : 'Task';
  const headingText = `${taskList.length} ${tasksNoun} Remaining`;

  return (
    <div className="todoapp">
      <h1>To Do List</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton name="All" pressed={true} />
        <FilterButton name="Active" pressed={false} />
        <FilterButton name="Completed" pressed={false} />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
