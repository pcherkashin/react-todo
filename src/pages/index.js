import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'

// npm install uuid
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'mytodos'

export default function Todo(){

  const [ todos, setTodos ] = useState( [] )

   const todoRefName = useRef()

   useEffect( ()=> {
    const storedTodos = JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ))
      if ( storedTodos ) {
        setTodos( storedTodos )
      }

   }, [ ])
   
   useEffect( ()=> {
    localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify(todos ))
   }, [ todos ])

   function addTodo( event ) {
    const name = todoRefName.current.value
    

    if( '' === name ) return
    console.log(name)

    setTodos( previousTodos => {
      return [ ...previousTodos, { id: uuidv4(), name: name, completed: false}]
    })

    todoRefName.current.value = null
   }

   function toggleTodo( id ) {
    const newTodos = [...todos]
    const todo = newTodos.find( todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos( newTodos )
   }

   function uncompletedTasksCount() {
    return todos.filter(todo => !todo.completed).length
  }

  function clearAll(){
    const newTodos = todos.filter( todo => !todo.completed )
    setTodos( newTodos )
  }

  return(
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoRefName}type="text" />
    <button onClick={ addTodo }>Add Task</button>
    <button onClick={ clearAll }>Clear Completed Tasks</button>
    <div>{uncompletedTasksCount()} UnCompleted tasks</div>

    
    </>
  )
}
