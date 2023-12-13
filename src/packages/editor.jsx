import { computed, defineComponent, provide } from 'vue'
import './editor.scss'
import EditorBlock from './editor-block'
import { EditorConfig } from './editor.config'

export default defineComponent({
    props: {
        modelValue: { type: Object },
    },
    setup(props) {
        console.log(props.modelValue)

        const data = computed(() => props.modelValue)
        console.log(EditorConfig, 1236)

        provide('config', EditorConfig)

        return () => (
            <div class="editor">
                <div class="editor-left">
                    {EditorConfig.componentList.map((component) => (
                        <div class="editor-left-item">
                            <span class="editor-left-item__label">{component.label}</span>
                            <span class="editor-left-item__preview">{component.preview()}</span>
                        </div>
                    ))}
                </div>
                <div class="editor-right">属性控制</div>
                <div class="editor-top">顶部菜单</div>
                <div class="editor-container">
                    <div class="editor-container-canvas">
                        <div class="editor-container-canvas__content" style={data.value.container}>
                            {data.value.blocks.map((item) => (
                                <EditorBlock block={item}></EditorBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})
