import { computed, defineComponent, provide, ref } from 'vue'
import './editor.scss'
import EditorBlock from './editor-block'
import { EditorConfig } from './editor.config'
import { menuDrag } from './menuDrag'

export default defineComponent({
    props: {
        modelValue: { type: Object },
    },
    setup(props) {
        const data = computed(() => props.modelValue)

        provide('config', EditorConfig)

        // 获取画布
        const containerRef = ref(null)
        const { dragStart, dragEnd } = menuDrag(data, containerRef)
        return () => (
            <div class="editor">
                <div class="editor-left">
                    {EditorConfig.componentList.map((component) => (
                        <div
                            class="editor-left-item"
                            draggable
                            onDragstart={() => dragStart(component)}
                            onDragend={(e) => dragEnd(e)}
                        >
                            <span class="editor-left-item__label">{component.label}</span>
                            <span class="editor-left-item__preview">{component.preview()}</span>
                        </div>
                    ))}
                </div>
                <div class="editor-right">属性控制</div>
                <div class="editor-top">顶部菜单</div>
                <div class="editor-container">
                    <div class="editor-container-canvas">
                        <div
                            class="editor-container-canvas__content"
                            ref={containerRef}
                            style={data.value.container}
                        >
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
