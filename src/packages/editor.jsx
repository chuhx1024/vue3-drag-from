import { defineComponent } from 'vue'
import './editor.scss'

export default defineComponent({
    props: {
        data: { type: Object },
    },
    setup(props) {
        console.log(props)
        return () => (
            <div class="editor">
                <div class="editor-left">物料区</div>
                <div class="editor-right">属性控制</div>
                <div class="editor-top">顶部菜单</div>
                <div class="editor-container">
                    <div class="editor-container-canvas">
                        <div class="editor-container-canvas__content">
                            <div>2</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})
