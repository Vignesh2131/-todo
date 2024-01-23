import PropTypes from 'prop-types'

const CompletedTasks = ({ todos, deleteTask }) => {
  return (
    <div className="mx-auto flex-col max-w-lg justify-center m-4">
          <ol>
            {todos.length === 0 ? <h1>You have done nothing</h1> : ""}
            {todos?.map((todo) => {
              return (
                <li
                  className="flex justify-between items-center gap-4  bg-fuchsia-400 m-2 p-2 px-6 rounded-md "
                  key={todo.id}
                >
                  <div className="flex-1">
                    <span>{todo.task}</span>
                  
                  </div>

                  <div className="p-1">
                    <button
                      className="rounded-sm hover:scale-125"
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