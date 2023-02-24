import React, {ChangeEvent} from "react";
import {EditableSPan} from "./EditableSPan";
import {TasksType} from "./Todolist";

type TaskPropsType = {
    task: TasksType
    removeTask: (todolistId: string, taskId: string) => void
    updateHandler: (newId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    todolistId: string


}

export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = () => {
        props.removeTask(props.todolistId, props.task.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   checked={props.task.isDone}
                   onChange={onChangeHandler}
            />

            <EditableSPan oldTitle={props.task.title}
                          callback={(newTitle: string) => props.updateHandler(props.task.id, newTitle)}/>

            <button onClick={onRemoveHandler}>X</button>
        </div>
    )


})