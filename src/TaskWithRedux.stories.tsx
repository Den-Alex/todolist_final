import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";
import {TaskWithRedux} from "./TaskWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksType} from "./Todolist";





export default {
    title: 'TaskWithRedux',
    component: TaskWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskWithRedux>

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TasksType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux task={task}  todolistId={'todolistId1'} updateHandler={() =>{}}/>
}


const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskCopy />

export const TaskWithReduxStory = Template.bind({})



