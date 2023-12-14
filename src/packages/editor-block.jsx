import { defineComponent, computed, inject, onMounted, ref } from 'vue'

export default defineComponent({
    props: {
        block: { type: Object },
    },

    setup(props) {
        const blockStyle = computed(() => ({
            top: props.block.top + 'px',
            left: props.block.left + 'px',
            zIndex: props.zIndex,
            position: 'absolute',
        }))
        const { componentMap } = inject('config')

        const editorBlock = ref(null)
        onMounted(() => {
            let { offsetWidth, offsetHeight } = editorBlock.value
            if (props.block.alignCenter) {
                props.block.top -= offsetHeight / 2
                props.block.left -= offsetWidth / 2
                props.block.alignCenter = false
            }
        })

        return () => (
            <div ref={editorBlock} style={blockStyle.value}>
                {componentMap[props.block.key].render()}
            </div>
        )
    },
})
