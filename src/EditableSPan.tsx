import React, {ChangeEvent, useCallback, useState} from 'react';

type  EditableSPanType = {
    oldTitle: string
    callback: (newTitle: string) => void

}
export const EditableSPan = React.memo((props: EditableSPanType) => {
    console.log('Edit')

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const onBlurHandler = () => {
        setEdit(!edit)
        addTask()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {
        props.callback(newTitle)
    }



return (
    edit
        ? <input value={newTitle} onBlur={onBlurHandler} onChange={onChangeHandler} autoFocus/>
        : <span onDoubleClick={onBlurHandler}>{props.oldTitle}</span>
);
})

