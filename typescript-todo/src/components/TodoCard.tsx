import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TodoModel } from './TodoModel';
import { BiEdit } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'


interface Props {
  index: number
  todo: TodoModel,
  todoList: TodoModel[],
  setTodoList: React.Dispatch<React.SetStateAction<TodoModel[]>>
}

export default function TodoCard({todo, todoList, setTodoList, index}: Props) {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
      setTodoList(
        todoList.map((todo) => (
          todo.id === id ? { ...todo, isDone: !todo.isDone} : todo
        ))
      )
    }

    const handleDelete = (id: number) => {
      setTodoList(
        todoList.filter((todo) => {
          return todo.id !== id
        })
      )
    }

    const handleEditSubmit = (e: React.FormEvent, id: number) => {
      e.preventDefault();
      setTodoList(
        todoList.map((todo) => (
          todo.id === id ? {...todo, todo: editTodo} : todo
        ))
      )
      setEdit(false)
    }
    
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
      inputRef.current?.focus();
    }, [edit])


    return (
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div 
            className={`todo-card ${snapshot.isDragging ? 'drag' : ''}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <form 
              className="todo-card-form" 
              onSubmit={(e) => handleEditSubmit(e, todo.id)}
            >
              { edit ? (
                <div className="todo-card-edit">
                  <input 
                    ref={inputRef}
                    value ={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todo-card-edit"
                  />
                  <button type='submit'>Go</button>
                </div>
              ):(
                todo.isDone ? (
                  <s className='todo-card-text'>{todo.todo}</s>
                ): (
                  <span className='todo-card-text'>{todo.todo}</span>
                )
              )}
            </form>
            <div className="todo-card-icons">
              <BiEdit 
                className="todo-card-icons" 
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit)
                  }
                }} 
              />
              <AiFillDelete className="todo-card-icons" onClick={() => handleDelete(todo.id)}/>
              <BsCheck className="todo-card-icons" onClick={() => handleDone(todo.id)}/>
            </div>
          </div>
        )}
      </Draggable>
      
    )
}
