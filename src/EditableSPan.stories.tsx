import {action} from "@storybook/addon-actions";
import {EditableSPan} from "./EditableSPan";


export default {
    title: 'EditableSPan',
    component: EditableSPan
}
const updateTodolistHandler = action('updateTodolistHandler')

export const EditableSPanExample = (props: any) => {
    return <EditableSPan oldTitle='oldTitle' callback={updateTodolistHandler}/>
}