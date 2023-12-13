import { defineComponent, computed } from 'vue'

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
        return () => <div style={blockStyle.value}>{props.block.top}</div>
    },
})
