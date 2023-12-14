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
        // 1. 实现左侧菜单拖拽功能
        const { dragStart, dragEnd } = menuDrag(data, containerRef)
        // 2. 实现获取焦点
        const blockMouseDown = (e, block) => {
            e.preventDefault()
            e.stopPropagation()

            if (!block.focus) {
                if (!e.shiftKey) {
                    data.value.blocks.forEach((item) => {
                        item.focus = false
                    })
                }
                block.focus = true
            } else {
                block.focus = false
            }
        }
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
                                <EditorBlock
                                    class={item.focus ? 'editor-block-focus' : ''}
                                    onMousedown={(e) => {
                                        blockMouseDown(e, item)
                                    }}
                                    block={item}
                                ></EditorBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})
