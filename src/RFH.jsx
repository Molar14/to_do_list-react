import { useState } from "react"
import { useForm } from "react-hook-form"
import {clsx} from "clsx"

export default function RHF() {
const [todos, setTodos] = useState([])

const { register, 
  handleSubmit, 
  formState: {errors,isValid,isSubmitted},
  reset
} = useForm()

function onSubmit(data){
  setTodos(
    [
      ... todos, data.todo
    ]
  )
  reset()
}

function removeTodo(indexToRemove){
  // todos.splice(indexToRemove, 1)
  // setTodos([todos])
  const newTodos = todos.filter(((todos, idx) => idx !== indexToRemove))
  setTodos(newTodos)
}

  return (
    <main className="w-full min-h-screen">
        <p className="w-full bg-teal-600 text-black font-bold text-center p-2">To do Vercion:react-hooh-form</p>
      <form 
      className="flex flex-row gap-2 justify-center p-5"
      onSubmit={handleSubmit(onSubmit)}
      >
      <input 
      type="text" 
      placeholder="Ingreasa una tarea" 
      className= {clsx("p-2 rounded text-black w-full max-w-screen-sm", {"border-2 border-red-500": errors.todo,
        })}
      required
      { ... register('todo',{
        required: { value:true, message:"Ponle algo"},
        minLength: { value:3, message:"Minimo 3 caracteres..... porfavor"},
        maxLength: { value:180, message:"No me la container te pregunte nomas la hora"},
      }) }
      />
        <button 
        className={clsx("text-black px-3 rounded", {
          "bg-slate-300":isSubmitted ? !isValid : false, 
          "bg-white": isSubmitted ? isValid : true 
        })}
        disabled={isSubmitted ? !isValid : false}
        > 
        + Agregar
        </button>
      </form>
      {
        errors.todo && (
          <p className="text-red-500 text-center text-sm font-semibold">{errors.todo?.message}</p>
        )
      }
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
