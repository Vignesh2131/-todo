import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ProgressTasks from "./components/ProgressTasks";
import CompletedTasks from "./components/CompletedTasks";
import AllTasks from "./components/AllTasks";
import { notify } from "./components/HandlerFunctions";
import { ToastContainer} from "react-toastify";

//Get all todos
const localAllTodos = (name) => {
  let todos = localStorage.getItem(name);
  if (todos) {
    return JSON.parse(todos);
  } else {
    return [];
  }
} 
function App() {
  const [tasks, setTasks] = useState("");
  const [todos, setTodos] = useState(localAllTodos('allTasks'));
  const [progressTodos, setProgressTodos] = useState(localAllTodos('progressTasks'));
  const [completeTodos, setCompleteTodos] = useState(localAllTodos('completedTasks'));
  const [allTasksActive, setAllTasksActive] = useState(true);
  const [allProcessTasks, setAllProcessTasks] = useState(false);
  const [allCompletedTasks, setCompletedTasks] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasks.trim() !== "") {
       setTodos((c) => [
         ...c,
         { task: tasks, id: uuidv4(), is_complete: false,is_progress:false },
       ]);
      setTasks("");
      setAllTasksActive(true);
      setAllProcessTasks(false);
      setCompletedTasks(false);
      notify("New task added")
    } 
  }

  const deleteTask = (ID) => {
    const newTodos = todos.filter((el) => el.id !== ID);
    const newProcessTodos = progressTodos.filter((el) => el.id !== ID);
    const completedTodo = completeTodos.filter((el) => el.id !== ID);
    setTodos(newTodos)
    setProgressTodos(newProcessTodos)
    setCompleteTodos(completedTodo)
    notify("Task is deleted.")
  }

  const progressHandle = (ID) => {
    const inProgress = todos.filter((el) => el.id === ID);
    const newTasks = todos.filter((el) => el.id !== ID);
    setProgressTodos((prev) => [
      ...prev,
      {
        task: inProgress[0].task,
        id: inProgress[0].id,
        is_progress: true,
        is_complete: false,
      },
    ]);
    setTodos(newTasks);
     notify("Task is in progress")

  }

  const completeHandle = (ID) => {
    const completed = progressTodos.filter((el) => el.id === ID);
    const newProgress = progressTodos.filter((el) => el.id !== ID);
     setCompleteTodos((prev) => [
       ...prev,
       {
         task: completed[0].task,
         id: completed[0].id,
         is_progress: false,
         is_complete: true,
       },
     ]);
    setProgressTodos(newProgress)
    notify("Task is done.")
  }

  const deleteProcess = (ID) => {
    const completed = progressTodos.filter((el) => el.id !== ID);
    setProgressTodos(completed);
  }

  const showAllTasks = (type) => {
    if (type == 'allTodos') {
     setAllTasksActive(true);
     setAllProcessTasks(false);
     setCompletedTasks(false);
    }
    if (type == 'processTodos') {
       setAllTasksActive(false);
       setAllProcessTasks(true);
       setCompletedTasks(false);
    }
    if (type == 'completedTodos') {
       setAllTasksActive(false);
       setAllProcessTasks(false);
       setCompletedTasks(true);
    }
  }

  useEffect(() => {
    localStorage.setItem('allTasks', JSON.stringify(todos));
    localStorage.setItem('progressTasks', JSON.stringify(progressTodos));
    localStorage.setItem('completedTasks', JSON.stringify(completeTodos));;
  }, [todos, progressTodos, completeTodos])
 
  return (
    <>
      <h1 className="font-bold text-2xl flex justify-center mt-4 mb-2">
        Task <img src="/vite.svg" width={30} height={30} alt=""/> Zen
      </h1>
      <form
        id="todo-form"
        className="flex justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="border rounded-md p-2"
          type="text"
          placeholder="Plan ahead"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <button
          className="rounded-md text-white py-1 px-4 bg-lime-500"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="mx-auto max-w-lg justify-center items-center my-4">
        <div className="flex justify-around items-center px-2">
          <button
            className={`border-b-4 p-1 rounded-sm md:w-36 hover:border-violet-400 ${
              allTasksActive ? "border-violet-400" : ""
            }`}
            onClick={() => showAllTasks("allTodos")}
          >
            {`New Tasks ${
              todos.length > 0
                ? `
              - ${todos.length}
            `
                : ""
            }`}
          </button>
          <button
            className={`border-b-4 p-1 rounded-sm md:w-36 hover:border-amber-400 ${
              allProcessTasks ? "border-amber-400" : ""
            }`}
            onClick={() => {
              showAllTasks("processTodos");
            }}
          >
            {`Progress Tasks ${
              progressTodos.length > 0
                ? `
              - ${progressTodos.length}
            `
                : ""
            }`}
          </button>
          <button
            className={`border-b-4 p-1 rounded-sm md:w-40 hover:border-fuchsia-400 ${
              allCompletedTasks ? "border-fuchsia-400" : ""
            }`}
            onClick={() => {
              showAllTasks("completedTodos");
            }}
          >
            {`Completed Tasks ${
              completeTodos.length > 0
                ? `
              - ${completeTodos.length}
            `
                : ""
            }`}
          </button>
        </div>
        <div className="">
          {allTasksActive ? (
            <AllTasks
              todos={todos}
              deleteTask={deleteTask}
              progressHandle={progressHandle}
              completeHandle={completeHandle}
            />
          ) : (
            ""
          )}
          {allProcessTasks ? (
            <ProgressTasks
              todos={progressTodos}
              deleteProcess={deleteProcess}
              completeHandle={completeHandle}
            />
          ) : (
            ""
          )}
          {allCompletedTasks ? (
            <CompletedTasks todos={completeTodos} deleteTask={deleteTask} />
          ) : (
            ""
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App
