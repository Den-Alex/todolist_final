import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistACType | AddTodolistACType | UpdateTodolistTitleTypeAC | ChangeTodolistFilterAC
export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistType> = [
    // {id: todolistId1, title: "What to learn", filter: "all"},
    // {id: todolistId2, title: "What to read", filter: "all"},
]
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
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
            return  state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newTodolistTitle} : t)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.newFilter} : tl)
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
export const updateTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTodolistTitle
        }
    } as const
}

type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}