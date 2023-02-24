import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistACType, RemoveTodolistACType, todolistId1, todolistId2} from "./todolists-reducer";


type ActionType = RemoveTaskType | AddTaskType | ChangeTaskStatus | ChangeTaskTitleType
    | AddTodolistACType | RemoveTodolistACType

const initialState: TasksStateType = {
    // [todolistId1]: [
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "TS", isDone: true},
    //     {id: v1(), title: "React", isDone: false}
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: "1984", isDone: true},
    //     {id: v1(), title: "Fahrenheit 451", isDone: true},
    //     {id: v1(), title: "All Quiet on the Western Front", isDone: true},
    // ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const newState = {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(s => s.id !== action.payload.taskId)
            }
            return newState
        }
        case "ADD-Task": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            const newState = {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
            return newState
        }
        case "CHANGE-TASK-STATUS": {
            const newState = {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(s => s.id === action.payload.taskId
                        ? {...s, isDone: action.payload.isDone}
                        : s)
            }
            return newState
        }
        case "CHANGE-TASK-TITLE": {
            const newState = {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(s => s.id === action.payload.taskId
                        ? {...s, title: action.payload.title}
                        : s)
            }
            return newState
        }
        case "ADD-TODOLIST": {
            const newState = {
                ...state,
                [action.payload.todolistId]: []
            }
            return newState
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }
        default:
            return state
    }
}

type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string,taskId: string ) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId,
        }
    } as const
}

type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string,title: string) => {
    return {
        type: 'ADD-Task',
        payload: {
            title,
            todolistId
        }
    } as const
}
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, isDone, todolistId}
    } as const
}
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string,taskId: string, title: string, ) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, title, todolistId}
    } as const
}