import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistACType | AddTodolistACType | UpdateTodolistTitleTypeAC | ChangeTodolistFilterAC

export const todolistsReducer = (state:Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST' : {
            // let newTodolistId = v1()
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: "all"}
            return [...state, newTodolist]
        }
        case 'UPDATE-TODOLIST-TITLE' : {
            return  state.map(t => t.id === action.payload.todolistId2 ? {...t, title: action.payload.newTodolistTitle} : t)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(tl => tl.id === action.payload.todolistId2 ? {...tl, filter: action.payload.newFilter} : tl)
        }
        default:
            return state
    }
}


export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle:string) => {
    return {
        type: 'ADD-TODOLIST',
        payload : {
            newTodolistTitle,
            todolistId: v1()
        }
    } as const
}

type UpdateTodolistTitleTypeAC = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistId2:string, newTodolistTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistId2,
            newTodolistTitle
        }
    } as const
}

type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId2:string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId2,
            newFilter
        }
    } as const
}