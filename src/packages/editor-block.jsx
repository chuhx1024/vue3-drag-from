import { defineComponent, computed, inject } from 'vue'

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
        console.log(componentMap, 6766)
        return () => <div style={blockStyle.value}>{componentMap[props.block.key].render()}</div>
    },
})
