import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";


type ActionType = RemoveTaskType | AddTaskType | ChangeTaskStatus | ChangeTaskTitleType
    | AddTodolistACType | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
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
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-Task',
        payload: {
            title,
            todolistId
        }
    } as const
}
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, isDone, todolistId}
    } as const
}
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, title, todolistId}
    } as const
}