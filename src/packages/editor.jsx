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

        // 计算属性自动获取 已经选中的 block
        const fouceBlocks = computed(() => {
            return data.value.blocks.filter((item) => item.focus)
        })

        // 清空全部 选中 block
        const clearAllFocus = () => {
            data.value.blocks.forEach((item) => {
                item.focus = false
            })
        }
        // 2. 实现获取焦点
        const blockMouseDown = (e, block) => {
            e.preventDefault()
            e.stopPropagation()

            if (!block.focus) {
                if (!e.shiftKey) {
                    clearAllFocus()
                }
                block.focus = true
            } else {
                block.focus = false
            }

            let dargState = {
                startX: e.clientX,
                startY: e.clientY,
                startPos: fouceBlocks.value.map((item) => ({
                    top: item.top,
                    left: item.left,
                })),
            }
            console.log(dargState)

            const mousemove = (e) => {
                let durX = e.clientX - dargState.startX
                let durY = e.clientY - dargState.startY
                console.log(durX, durY)
                fouceBlocks.value.forEach((item, index) => {
                    item.top = dargState.startPos[index].top + durY
                    item.left = dargState.startPos[index].left + durX
                })
            }

            const mouseup = () => {
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseup)
            }

            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseup)
        }
        // 点击空白区域  全部清空
        const contentkMouseDown = () => {
            clearAllFocus() // 让容器中的选中 全部失去焦点
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
                            onMousedown={() => {
                                contentkMouseDown()
                            }}
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
