import './App.css'
import { TbPencilPlus } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import { v4 as uuid } from 'uuid';


function App() {
  const [todos, setTodos] = useState([])
  const [popup, setPopup] = useState(false)
  const [newText, setNewText] = useState('')

  function togglePopup() {
    setPopup(!popup)
  }
  function addTask() {
    if (newText !== "") {
      setTodos(prevTodos => {
        return [
          ...prevTodos,
          {
            id: uuid(),
            text: newText,
            complete: false
          }
        ]
      })
      setNewText("")
      togglePopup()
    }
  }
  function removeTask(id) {
    setTodos(prevTodos => {
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }
  function toggleCompletion(id) {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          }
        }
        return todo;
      })
    })
  }
  return (
    <>
      {
        popup && <div className='popup-container'>
          <div className='popup'>
            <h3>Let's add your task!</h3>
            <input type="text" placeholder='Type your task' value={newText} onChange={(e) => {setNewText(e.target.value)}} />
            <div className="btns">
              <button className='cancel-btn' onClick={togglePopup}>Cancel</button>
              <button className='save-btn' onClick={addTask}>Save task</button>
            </div>
          </div>
        </div>
      }
      <header>
        <div className="content">
          <h2>My Tasks</h2>
          <button onClick={togglePopup} disabled={popup}><TbPencilPlus /></button>
        </div>
        <hr />
      </header>

      <div className="to-do-list">
        {
          todos.map(todo => {
            return (
              <div className="to-do-item" key={todo.id} style={{backgroundColor: todo.complete ? "rgb(158, 255, 250)" : "rgb(67, 149, 255)"}}>
                <div className="selection">
                  <input type="checkbox" id='checkbox' onClick={() => toggleCompletion(todo.id)}/>
                  <label htmlFor="checkbox" >{todo.complete}</label>
                  <p>{todo.text}</p>
                </div>
                <div className="delete-btn" onClick={() => removeTask(todo.id)}>
                  <FaRegTrashAlt />
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
