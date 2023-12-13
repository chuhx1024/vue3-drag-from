// 可以显示所有的物料

import { Button, Input } from 'ant-design-vue'
// const createEditorConfig = () => {
//     const componentList = []
//     const componentMap = {}

//     return {
//         componentList,
//         componentMap,
//         register: (component) => {
//             componentList.push(component)
//             componentMap[component.key] = component
//         },
//     }
// }

class createEditorConfig {
    componentList = []
    componentMap = {}

    register = (component) => {
        this.componentList.push(component)
        this.componentMap[component.key] = component
    }
}

export let EditorConfig = new createEditorConfig()

EditorConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: () => '渲染文本',
    key: 'text',
})
EditorConfig.register({
    label: '按钮',
    preview: () => <Button>预览按钮</Button>,
    render: () => <Button>渲染按钮</Button>,
    key: 'button',
})
EditorConfig.register({
    label: '输入框',
    preview: () => <Input placeholder="预览"></Input>,
    render: () => <Input placeholder="渲染"></Input>,
    key: 'input',
})
