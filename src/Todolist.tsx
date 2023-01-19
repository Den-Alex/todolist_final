import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSPan} from "./EditableSPan";

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


export function Todolist(props: TodolistType) {


    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, "all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, "active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, "completed")
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    const updateHandler = (newId: string,newTitle:string) => {
        props.updateTask(props.todolistId,newId,newTitle)
    }
    const updateTodolistHandler = (newTitle:string) => {
        props.updateTodolist(props.todolistId,newTitle)
    }



    return (
        <div>
            <EditableSPan oldTitle={props.title} callback={updateTodolistHandler}/>
            {/*<h3>{props.title}</h3>*/}

            <button onClick={removeTodolistHandler}>X</button>


            <AddItemForm callback={addTaskHandler}/>


            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(props.todolistId, t.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            />

                           <EditableSPan oldTitle={t.title} callback={(newTitle: string) => updateHandler(t.id,newTitle)}/>

                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
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
}


