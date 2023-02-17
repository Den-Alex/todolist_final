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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export function AppWithRedux() {



    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)



    const updateTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, newTitle))
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
        // delete tasks[todolistId]
    }

    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatch(action)
    }


    const updateTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, newTitle)
        dispatch(action)

    }


    function removeTask(todolistId: string, taskId: string) {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }


    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        const action = changeTaskStatusAC(todolistId, taskId, newIsDone)
        dispatch(action)
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


