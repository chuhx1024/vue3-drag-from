import { computed, defineComponent } from 'vue'
import './editor.scss'
import EditorBlock from './editor-block'

export default defineComponent({
    props: {
        modelValue: { type: Object },
    },
    setup(props) {
        console.log(props.modelValue)

        const data = computed(() => props.modelValue)
        console.log(data.value, 123)

        return () => (
            <div class="editor">
                <div class="editor-left">物料区</div>
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
