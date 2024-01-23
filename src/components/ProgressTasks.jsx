import PropTypes from "prop-types";

const ProgressTasks = ({todos,deleteProcess,completeHandle}) => {
  return (
    <div className="mx-auto flex-col justify-center m-4 max-w-lg">
      <ol>
        {todos.length === 0 ? <h1>No Tasks are in pending</h1> : ""}
        {todos?.map((todo) => {
          return (
            <li
              className="flex justify-between items-center gap-4 m-2 bg-amber-400 p-2 px-6 rounded-md "
              key={todo.id}
            >
              <div className="flex-1">
                <span>{todo.task}</span>
              </div>

              <div className="flex gap-4 justify-center p-1">
                <button
                  className="rounded-sm hover:scale-110"
                  onClick={() => deleteProcess(todo.id)}
                >
                  <img width={30} height={30} src="/del.svg" alt="btn" />
                </button>
                <button
                  className="rounded-sm hover:scale-95"
                  onClick={() => completeHandle(todo.id)}
                >
                  <img src="/done.svg" alt="done" width={30} />
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
ProgressTasks.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteProcess: PropTypes.func,
  completeHandle:PropTypes.func
}
export default ProgressTasks;
