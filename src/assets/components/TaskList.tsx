import  { useState } from "react";
import './tasklist.css'

interface Task {
    id: number;
    task: string;
    status: boolean;
}

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]); 
    const [input, setInput] = useState<string>("");
    const [random, setRandom] = useState<string>("Click the button to generate a task!")

    const handleTasks = (id:number) => {
        setTasks(tasks.map((task) => {
            if (task.id === id) {
                return {...task, status: !task.status }
            }
            return task;
        }))
    }

    const handleAdd = () => {
        const newTask: Task  = {id: Date.now(), task: input, status: false};
        if(input.length > 0){
            setTasks([...tasks, newTask])
            setInput('')
        } 
    }

    const handleRandomiser = () => {
        const random = Math.floor(Math.random() * tasks.length);
        const randomTask = tasks[random];
        return randomTask.task
    }


    return (
        <>  
            <h2>{random}</h2>
            <div className="list-container">
                <ul>
                    {tasks.map((task) =>( 
                    <li 
                        key={task.id} 
                        onClick={() => handleTasks(task.id)}
                        style={{ textDecoration: task.status ? "line-through" : "none"}}
                    >
                        {task.task}
                    </li>))}
                </ul>
                <input 
                    type="text" 
                    value={input}
                    className="task-input" 
                    placeholder="Add a new task" 
                    onChange={(e) => setInput(e.currentTarget.value)}
                />
                <div className="btn-container">
                    <button onClick={handleAdd}>Add Task</button>
                    <button onClick={() => setRandom(handleRandomiser)}>Generate a task</button>
                </div>
                
            </div>
        </>
    )
}