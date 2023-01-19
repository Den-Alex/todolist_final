import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export function App() {

    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})

    }


    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})

    }


    function addTask(todolistId: string, title: string) {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title: title, isDone: false}]})
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})

    }


    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map((t) => t.id === todolistId ? {...t, filter: value} : t))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (todolistTitle: string) => {
        let newId = v1()
        let newTodolist: TodolistType = {id: newId, title: todolistTitle, filter: "all"}
        setTodolists([...todolists, newTodolist])
        setTasks({
            ...tasks, [newId]: [{id: v1(), title: "1984", isDone: true},
                {id: v1(), title: "Fahrenheit 451", isDone: true},]
        })
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to read", filter: "all"},
    ])


    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "TS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "1984", isDone: true},
            {id: v1(), title: "Fahrenheit 451", isDone: true},
            {id: v1(), title: "All Quiet on the Western Front", isDone: true},
        ]
    })


    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks[tl.id];
                    if (tl.filter === "completed") {
                        taskForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                    }
                    if (tl.filter === "active") {
                        taskForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                    }

                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     todolistId={tl.id}
                                     tasks={taskForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                                     removeTodolist={removeTodolist}
                                     updateTask={updateTaskTitle}
                                     updateTodolist={updateTodolistTitle}
                    />
                })
            }

        </div>
    );
}


