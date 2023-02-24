import React, {useCallback, useReducer, useState} from 'react';
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

    console.log('App')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)



    const updateTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistId, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
        // delete tasks[todolistId]
    }, [dispatch])

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle)
        dispatch(action)
    }, [dispatch])


    const updateTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistId, taskId, newTitle)
        dispatch(action)

    }, [dispatch])


    const removeTask = useCallback((todolistId: string, taskId: string) =>  {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }, [dispatch])


    const addTask = useCallback((todolistId: string, title: string) =>  {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, newIsDone: boolean) =>  {
        const action = changeTaskStatusAC(todolistId, taskId, newIsDone)
        dispatch(action)
    }, [dispatch])


    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks[tl.id];


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


