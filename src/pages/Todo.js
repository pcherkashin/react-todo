import React from 'react'

export default function Todo( { todo, toggleTodo } ) {

    function toggleTodoEvent(){
        toggleTodo( todo.id )
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.completed} onChange={toggleTodoEvent} />
            { todo.name }
            </label>
        </div>

    )
}