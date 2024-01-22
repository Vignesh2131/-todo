import PropTypes from "prop-types";

const AllTasks = ({ todos, deleteTask, progressHandle, completeHandle }) => {
  return (
    <div className="mx-auto max-w-lg flex-col  justify-center m-2">
      <h2 className="text-lg text-center text-semiBold">All Tasks</h2>
      <ol>
        {todos.length === 0 ? (
          <h1 className="text-center">No new tasks have been added</h1>
        ) : (
          ""
        )}
        {todos?.map((todo) => {
          return (
            <li
              className="flex items-center m-2 bg-violet-300 p-2 px-6 rounded-md"
              key={todo.id}
            >
              <div className="flex-1">
                <span>{todo.task}</span>
                <div className="text-sm font-semibold italic">Task added at {todo.date_added[0] > 12 ? todo.date_added[0] - 12 : todo.date_added[0]}:{todo.date_added[1]} {todo.date_added[0]>12?'pm':'am'}</div>
              </div>
              <div className="flex gap-4 justify-center p-1">
                <button
                  className="rounded-sm bg-white"
                  onClick={() => deleteTask(todo.id)}
                >
                  <img width={30} height={30} src="/del.svg" alt="btn" />
                </button>
                <button
                  className="rounded-sm bg-white"
                  onClick={() => progressHandle(todo.id)}
                >
                  <img src="/progress.png" alt="progress" width={30} />
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

AllTasks.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTask: PropTypes.func,
  progressHandle: PropTypes.func,
  completeHandle: PropTypes.func,
};
export default AllTasks;
