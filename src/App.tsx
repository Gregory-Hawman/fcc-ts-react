import React, { useState } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoModel } from './components/TodoModel';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoModel[]>([])
  const [completedTodoList, setCompletedTodoList] = useState<TodoModel[]>([])

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodoList([...todoList, {id: Date.now(), todo, isDone: false}])
      setTodo('')
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, 
    active = todoList, 
    completed = completedTodoList;

    if (source.droppableId === 'todo-list-drop'){
      add = active[source.index];
      active.splice(source.index, 1)
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === 'todo-list-drop') {
        active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add)
    }

    setCompletedTodoList(completed)
    setTodoList(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Typescript-Todo</span>
        <InputField 
          todo={todo}
          setTodo={setTodo} 
          handleAddTodo={handleAddTodo}
        />
        <TodoList 
          todoList={todoList} 
          setTodoList={setTodoList} 
          completedTodoList={completedTodoList}
          setCompletedTodoList={setCompletedTodoList}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
