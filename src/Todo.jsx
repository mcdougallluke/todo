import React from 'react'
import { FaRegTrashAlt, FaCheckCircle, FaRegCircle } from 'react-icons/fa'


const style = {
    li: `flex justify-between items-center bg-slate-200 p-4 my-2 capitalize rounded-md`,
    liComplete: `flex justify-between items-center bg-slate-400 p-4 my-2 capitalize rounded-md`,
    row: `flex items-center`,
    text: `text-xl ml-2 cursor-pointer`,
    textComplete: `cursor-pointer ml-2 line-through text-xl`,
    button: `cursor-pointer flex items-center`,
    checkbox: `cursor-pointer mr-2`, 
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
            <div className={style.row}>
                <div onClick={() => toggleComplete(todo)} className={style.checkbox}>
                    {todo.completed ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
                </div>
                <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>
                    {todo.text}
                </p>
            </div>
            <button onClick={() => deleteTodo(todo.id)} className={style.button}><FaRegTrashAlt /></button>
        </li>
  )
}

export default Todo