import React, {useState, useEffect} from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo'
import {db} from './firebase'
import {
    query, 
    collection, 
    onSnapshot, 
    updateDoc, 
    doc, 
    addDoc, 
    deleteDoc
} from 'firebase/firestore'

const style = {
    bg: `min-h-screen min-w-screen p-4 bg-[#121212]`, 
    container: `bg-gray-800 max-w-[600px] w-11/12 md:w-full m-auto rounded-md shadow-xl p-4`, // Darker shade for container
    heading: `text-4xl font-bold text-center text-[#BB86FC] p-2`, 
    form: `flex justify-between`,
    input: `border border-gray-600 p-2 w-full text-xl bg-gray-700 text-white`, 
    button: `border border-gray-600 p-4 ml-2 bg-[#BB86FC] text-white`, 
    count: `text-center p-2 text-xl text-white` 
}


function App() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const createTodo = async (e) => {
        e.preventDefault(e)
        if(input === '') {
            alert('Please enter a valid todo')
            return
        }
        await addDoc(collection(db, 'todos'), {
            text: input,
            completed: false
        })
        setInput('')
    }

    useEffect(() => {
        const q = query(collection(db, "todos"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todos = []
            querySnapshot.forEach((doc) => {
                todos.push({...doc.data(), id:doc.id})
            })
            setTodos(todos)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), {
            completed: !todo.completed
        })
    }

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id))
    }

  return (
    <div className={style.bg}>
        <div className={style.container}>
            <h3 className={style.heading}>Todo List</h3>
            <form onSubmit={createTodo} className={style.form}>
                <input
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    type='text' 
                    placeholder='Add Todo' 
                    className={style.input}>
                </input>
                <button className={style.button}><AiOutlinePlus size={30}/></button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
                ))}
            </ul>
            {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} todos`}</p>}
        </div>
    </div>
  );
}


export default App;
