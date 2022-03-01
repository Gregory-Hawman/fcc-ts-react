import React, { useRef } from 'react'
import './styles.css'

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAddTodo: (e: React.FormEvent) => void;
  }

const InputField = ({ todo, setTodo, handleAddTodo }:Props) => {
    const inputRef = useRef<HTMLInputElement>(null)


    return (
        <div className="input">
            <form className="input" onSubmit={(e) => {
                handleAddTodo(e)
                inputRef.current?.blur()
            }}>
                <input
                    ref={inputRef}
                    type='input' 
                    placeholder='Enter a task' 
                    className='input-box' 
                    value={todo}
                    onChange={
                        (e)=>setTodo(e.target.value)
                    }
                />
                <button className='input-submit' type='submit'>Add Task</button>
            </form>
        </div>
    )
}

export default InputField