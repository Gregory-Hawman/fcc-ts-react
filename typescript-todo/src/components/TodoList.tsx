import React from 'react';
import { TodoModel }from './TodoModel';
import TodoCard from './TodoCard';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todoList: TodoModel[];
    setTodoList: React.Dispatch<React.SetStateAction<TodoModel[]>>;
    completedTodoList: TodoModel[]
    setCompletedTodoList: React.Dispatch<React.SetStateAction<TodoModel[]>>
}

export default function TodoList({todoList, setTodoList, completedTodoList, setCompletedTodoList}: Props) {
  return (
    
    <div className="todo-list-container">
        <Droppable droppableId='todo-list-drop'>
            {(provided, snapshot) => (
                <div 
                    className={`todo-list-active ${snapshot.isDraggingOver ? 'drag-active' : ''}`}
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <h2 className="todo-list-heading">Active Tasks</h2>
                    <div className="todo-list">
                        {todoList.map((todo, index) => (
                            <TodoCard
                                index={index}
                                key={todo.id} 
                                todo={todo} 
                                todoList={todoList}
                                setTodoList={setTodoList}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>

        <Droppable droppableId='completed-list-drop'>
            {(provided, snapshot) => (
                <div 
                    className={`todo-list-completed ${snapshot.isDraggingOver ? 'drag-completed' : ''}`} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <h2 className="todo-list-heading">Completed Tasks</h2>
                    <div className="completed-list">
                        {completedTodoList.map((todo, index) => (
                            <TodoCard 
                                index={index}
                                key={todo.id} 
                                todo={todo} 
                                todoList={completedTodoList}
                                setTodoList={setCompletedTodoList}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    </div>
  )
}

// <div className="todo-list">
//         {todoList.map((todo) => (
//             <TodoCard 
//                 key={todo.id} 
//                 todo={todo} 
//                 todoList={todoList}
//                 setTodoList={setTodoList}
//             />
//         ))}
//     </div>