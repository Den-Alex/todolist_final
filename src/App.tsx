import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

// let tasks2 = [
//     {id: 1, title: "1984", isDone: true},
//     {id: 2, title: "Fahrenheit 451", isDone: true},
//     {id: 3, title: "All Quiet on the Western Front", isDone: false}
//
export function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "TS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }


    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    // let [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to read", filter: "completed"},
    ])


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks;
                    if (tl.filter === "completed") {
                        taskForTodolist = tasks.filter(t => t.isDone === true);
                    }
                    if (tl.filter === "active") {
                        taskForTodolist = tasks.filter(t => t.isDone === false);
                    }

                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     id={tl.id}
                                     tasks={taskForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }

        </div>
    );
}


