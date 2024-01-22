import PropTypes from "prop-types";

const ProgressTasks = ({todos,deleteProcess,completeHandle}) => {
  return (
    <div className="mx-auto flex-col  items-center justify-center m-2 max-w-lg">
      <h2 className="text-lg text-center text-semiBold">Progress Tasks</h2>
      <ol>
        {todos.length === 0 ? <h1 className="text-center">No Tasks are in pending</h1> : ""}
        {todos?.map((todo) => {
          return (
            <li
              className="flex justify-between items-center gap-4 m-2 bg-amber-400 p-2 px-6 rounded-md "
              key={todo.id}
            >
              <div className="flex-1">
                <span>{todo.task}</span>
                <div className="text-sm font-semibold italic">
                  In Progress from {" "}
                  {todo.date_added[0] > 12
                    ? todo.date_added[0] - 12
                    : todo.date_added[0]}
                  :{todo.date_added[1]} {todo.date_added[0] > 12 ? "pm" : "am"}
                </div>
              </div>

              <div className="flex gap-4 justify-center p-1">
                <button
                  className="rounded-sm bg-white"
                  onClick={() => deleteProcess(todo.id)}
                >
                  <img width={30} height={30} src="/del.svg" alt="btn" />
                </button>
                <button
                  className="rounded-sm bg-white"
                  onClick={() => completeHandle(todo.id)}
                >
                  <img src="/done.png" alt="done" width={30} />
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
