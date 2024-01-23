import PropTypes from "prop-types";

const AllTasks = ({ todos, deleteTask, progressHandle }) => {
  return (
    <div className="mx-auto max-w-lg flex-col  justify-center m-4">
      <ol>
        {todos.length === 0 ? (
          <h1>No new tasks have been added</h1>
        ) : (
          ""
        )}
        {todos?.map((todo) => {
          return (
            <li
              className="flex items-center m-2 bg-violet-400 p-2 px-6 rounded-md"
              key={todo.id}
            >
              <div className="flex-1">
                <span>{todo.task}</span>
              </div>
              <div className="flex gap-4 justify-center p-1">
                <button
                  className="rounded-sm hover:scale-110"
                  onClick={() => deleteTask(todo.id)}
                >
                  <img
                  
                    width={30}
                    height={30}
                    src="/del.svg"
                    alt="btn"
                  />
                </button>
                <button
                  className='rounded-sm hover:animate-spin-slow'
                  onClick={() => progressHandle(todo.id)}
                >
                  <img src="/progress.svg" alt="progress" width={30} />
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
