import React, {ChangeEvent} from "react";
import {EditableSPan} from "./EditableSPan";
import {TasksType} from "./Todolist";
import {useDispatch} from "react-redux";
import {action} from "@storybook/addon-actions";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskWithReduxType = {
    task: TasksType
    updateHandler: (newId: string, newTitle: string) => void
    todolistId: string


}

export const TaskWithRedux = React.memo((props: TaskWithReduxType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = () => {
        dispatch(removeTaskAC(props.todolistId, props.task.id))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id, e.currentTarget.checked))
    }
    const onChangeNewTitleHandler = (newTitle: string) => {
        // props.updateHandler(props.task.id, newTitle)
        // dispatch(addTaskAC (props.task.id, newTitle))
    }

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   checked={props.task.isDone}
                   onChange={onChangeHandler}
            />

            <EditableSPan oldTitle={props.task.title}
                callback={(newTitle: string) => props.updateHandler(props.task.id, newTitle)}
                          // callback={onChangeNewTitleHandler}
            />

            <button onClick={onRemoveHandler}>X</button>
        </div>
    )


})