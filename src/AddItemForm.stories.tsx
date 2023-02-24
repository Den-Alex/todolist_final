import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";



export default {
    title: 'AddItemForm',
    component: AddItemForm,
    argTypes: {
        callback: {
            description: 'Button'
        }
    }
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Template.bind({})



 AddItemFormStory.args = {
    callback: action('Button')
}