import PropTypes from 'prop-types'
import { v4 as uuidv4 } from "uuid";
const CompletedTasks = ({ todos, deleteTask }) => {
  return (
    <div className="mx-auto flex-col max-w-lg items-center justify-center m-2">
          <h2 className="text-lg text-center text-semiBold">Completed Tasks</h2>
          <ol>
            {todos.length === 0 ? <h1 className='text-center'>You have done nothing</h1> : ""}
            {todos?.map((todo) => {
              return (
                <li
                  className="flex justify-between items-center gap-4 m-2 bg-fuchsia-400 p-2 px-6 rounded-md "
                  key={uuidv4()}
                >
                  <div className="flex-1">
                    <span>{todo.task}</span>
                    <div className="text-sm font-semibold italic">
                      Completed at{" "}
                      {todo.date_added[0] > 12
                        ? todo.date_added[0] - 12
                        : todo.date_added[0]}
                      :{todo.date_added[1]}{" "}
                      {todo.date_added[0] > 12 ? "pm" : "am"}
                    </div>
                  </div>

                  <div className="p-1">
                    <button
                      className="rounded-sm bg-white"
                      onClick={() => deleteTask(todo.id)}
                    >
                      <img width={30} height={30} src="/del.svg" alt="btn" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
  )
}
CompletedTasks.propTypes = {
    todos: PropTypes.array.isRequired,
    deleteTask: PropTypes.func
}
export default CompletedTasks