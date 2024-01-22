import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ProgressTasks from "./components/ProgressTasks";
import CompletedTasks from "./components/CompletedTasks";
import AllTasks from "./components/AllTasks";
const localAllTodos = (name) => {
  let todos = localStorage.getItem(name);
  if (todos) {
    return JSON.parse(todos);
  } else {
    return [];
  }
} 
function App() {
  let [currHour, currMin] = [new Date().getHours(), new Date().getMinutes()];
  const [tasks, setTasks] = useState("");
  const [todos, setTodos] = useState(localAllTodos('allTasks'));
  const [progressTodos, setProgressTodos] = useState(localAllTodos('progressTasks'));
  const [completeTodos, setCompleteTodos] = useState(localAllTodos('completedTasks'));
  const handleSubmit = () => {
    if (tasks.trim() !== "") {
       setTodos((c) => [
         ...c,
         { task: tasks, id: uuidv4(), is_complete: false,is_progress:false,date_added:[currHour,currMin] },
       ]);
      setTasks("");
    } 
  }
  const deleteTask = (ID) => {
    const newTodos = todos.filter((el) => el.id !== ID);
    const completedTodo = completeTodos.filter((el) => el.id !== ID);
    setTodos(newTodos)
    setCompleteTodos(completedTodo)
  }

  const progressHandle = (ID) => {
    const inProgress = todos.filter((el) => el.id === ID);
    setProgressTodos((prev) => [
      ...prev,
      {
        task: inProgress[0].task,
        id: inProgress[0].id,
        is_progress: true,
        is_complete: false,
        date_added: [currHour, currMin],
      },
    ]);
  }
  const completeHandle = (ID) => {
    const completed = todos.filter((el) => el.id === ID);
     setCompleteTodos((prev) => [
       ...prev,
       {
         task: completed[0].task,
         id: completed[0].id,
         is_progress: false,
         is_complete: true,
         date_added: [currHour, currMin],
       },
     ]);
  }
  const deleteProcess = (ID) => {
    const completed = progressTodos.filter((el) => el.id !== ID);
    setProgressTodos(completed);
  }
  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(todos));
    localStorage.setItem('progressTasks', JSON.stringify(progressTodos));
    localStorage.setItem('completedTasks', JSON.stringify(completeTodos));
  }, [todos, progressTodos, completeTodos])
 
  if (currHour == 0 && currMin == 0) {
    localStorage.clear();
  }
  return (
    <>
      <h1 className="font-bold text-2xl flex justify-center mt-4 mb-2">
        #todo
      </h1>
      <div className="flex justify-center gap-4">
        <input
          className="border rounded-md p-2"
          type="text"
          placeholder="Plan ahead"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <button
          className="rounded-md text-white py-1 px-4 bg-lime-500"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
      <div className="flex-col justify-center items-center">
        <AllTasks todos={todos} deleteTask={deleteTask} progressHandle={progressHandle} completeHandle={completeHandle}/>
        <ProgressTasks todos={progressTodos} deleteProcess = {deleteProcess} completeHandle={completeHandle} />
        <CompletedTasks todos={completeTodos} deleteTask={deleteTask} />
      </div>
    </>
  );
}

export default App
