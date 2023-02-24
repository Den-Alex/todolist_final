import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {TasksType} from "./Todolist";
import React, {useState} from "react";


export default {
    title: 'Task',
    component: Task,
    args: {
        task: {id: '1', title: 'js', isDone: true},
        removeTask: action('removeTask'),
        updateHandler: action('updateHandler'),
        changeTaskStatus: action('changeTaskStatus'),
        todolistId: '1'
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDuneNotStory = Template.bind({})

export const TaskIsDuneStory = Template.bind({})

TaskIsDuneStory.args = {
    task: {id: '2', title: 'ts', isDone: false},
    todolistId: '2'
}
const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '1', title: 'js', isDone: true})

    const removeTask = () => {
        console.log('removeTask')
    }
    const updateTitleHandler = (newId: string, newTitle: string) => {
        // const newTsk = {id: '1', title: newTitle, isDone: true}
        setTask({id: '1', title: newTitle, isDone: true})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // const newTask = {id: '1', title: 'js', isDone: !task.isDone}
        setTask({id: '1', title: 'js', isDone: !task.isDone})
    }

    return <Task task={task}
                 removeTask={removeTask}
                 updateHandler={updateTitleHandler}
                 changeTaskStatus={changeTaskStatus}
                 todolistId='1'/>
}
export const TaskStory = Template1.bind({})