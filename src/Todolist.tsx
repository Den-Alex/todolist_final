import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSPan} from "./EditableSPan";
import {TaskWithRedux} from "./TaskWithRedux";
import { Task } from "./Task";



export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
}


export const Todolist = React.memo((props: TodolistType) => {

    console.log('Todo')
    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "all")
    }, [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "active")
    }, [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "completed")
    }, [props.changeFilter, props.todolistId])
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])
    const updateTodolistHandler = useCallback((newTitle: string) => {
        props.updateTodolist(props.todolistId, newTitle)
    }, [props.updateTodolist, props.todolistId])
    const updateHandler = useCallback((newId: string, newTitle: string) => {
        props.updateTask(props.todolistId, newId, newTitle)
    }, [props.updateTask, props.todolistId])



    let taskForTodolist = props.tasks
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.isDone === true);
    }
    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    return (
        <div>
            <EditableSPan oldTitle={props.title} callback={updateTodolistHandler}/>
            <button onClick={removeTodolistHandler}>X</button>
            <AddItemForm callback={addTaskHandler}/>

            <ul>
                {

                    taskForTodolist.map(t => <Task task={t}
                                               key={t.id}
                                               removeTask={props.removeTask}
                                               updateHandler={updateHandler}
                                               changeTaskStatus={props.changeTaskStatus}
                                               todolistId={props.todolistId}/>)
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
})

