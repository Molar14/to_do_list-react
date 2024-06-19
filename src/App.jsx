import { useState } from "react"

function App() {
const [todos, setTodos] = useState([])
const [text, setText] = useState("")

function addTodo(){
  setTodos([...todos,text])
}
function onSubmit(event){
  event.preventDefault();
  addTodo()
  setText("")
}

function removeTodo(indexToRemove){
  // todos.splice(indexToRemove, 1)
  // setTodos([todos])
  const newTodos = todos.filter(((todos, idx) => idx !== indexToRemove))
  setTodos(newTodos)
}

  return (
    <main className="w-full min-h-screen">
      <form 
      className="flex flex-row gap-2 justify-center p-5"
      onSubmit={onSubmit}
      >
      <input 
      type="text" 
      placeholder="Ingreasa una tarea" 
      className="p-2 rounded text-black w-full max-w-screen-sm" 
      value={text}
      onChange={(event) => setText(event.target.value)}
      required
      />
        <button 
        className="bg-white text-black px-3 rounded"
        > 
        + Agregar
        </button>
      </form>
      <div className="max-w-screen-sm mx-auto p-4 flex flex-col gap-2">
        {
          todos.length === 0 && <p className="text-white/50">No tienes tareas pendientes 🤷‍♂️</p>
        }
        {
          todos.map((todo, idx)=> {
            return <div key={`todo-${idx}`} className="bg-white/10 rounded p-4 flex flex-row justify-between">
              <span className="select-none">
              {todo}
              </span>
              <span className="text-red-500 cursor-pointer select-none hover:bg-red-500 hover:text-white rounded p-1 text-center " onClick={() => removeTodo(idx)}> 
              X
            </span>
            </div>
            
          }) 
        }
      </div>
    </main>
  )
}
export default App
