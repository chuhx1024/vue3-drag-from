export const menuDrag = (data: any, containerRef: any) => {
    let currentComponent: any = null
    const dragenter = (e: any) => {
        e.dataTransfer.dropEffect = 'move'
    }
    const dragover = (e: Event) => {
        e.preventDefault()
    }
    const dragleave = (e: any) => {
        e.dataTransfer.dropEffect = 'none'
    }
    const drop = (e: any) => {
        data.value.blocks.push({
            top: e.offsetY,
            left: e.offsetX,
            zIndex: 1,
            key: currentComponent.key,
            alignCenter: true,
        })
        currentComponent = null
    }
    const dragStart = (component: any) => {
        // 拖动的时候给我们的画布 绑定进入事件
        currentComponent = component
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
    }
    const dragEnd = () => {
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)
    }
    return {
        dragStart,
        dragEnd,
    }
}
