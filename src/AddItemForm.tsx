import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {Button} from "@mui/material";

type AddItemFormType = {
    callback: (title: string) => void

}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItem')
    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.ctrlKey && e.charCode === 13) {
            addTask()
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.callback(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Error")
        }

    }

    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button variant="contained" onClick={addTask}>add</Button>
            {/*<button onClick={addTask}>add</button>*/}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
})