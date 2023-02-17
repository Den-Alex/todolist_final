import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to read", filter: "all"},
    ])


    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
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


    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = updateTodolistTitleAC(todolistId, newTitle)
        dispatchToTodolistsReducer(action)
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolistsReducer(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC( todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
        // delete tasks[todolistId]
    }

    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC( todolistTitle)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)

    }


    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, newTitle)
        dispatchToTasksReducer(action)

    }


    function removeTask(todolistId: string, taskId: string) {
        const action = removeTaskAC(todolistId, taskId)
        dispatchToTasksReducer(action)
    }


    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(todolistId, title)
        dispatchToTasksReducer(action)
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        const action = changeTaskStatusAC(todolistId, taskId, newIsDone)
        dispatchToTasksReducer(action)
    }




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


