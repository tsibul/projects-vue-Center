export const modalDragAndDrop = {
    data() {
        return {
            dragging: false,
            diffX: 0,
            diffY: 0,
        }
    },
    methods: {
        startDrag(event) {
            this.dragging = true;
            const modal = this.$refs.modalDraggable;
            const rect = modal.getBoundingClientRect();
            this.diffX = event.clientX - rect.left;
            this.diffY = event.clientY - rect.top;
        },
        stopDrag() {
            this.dragging = false;
        },
        drag(event,) {
            if (this.dragging) {
                const modal = this.$refs.modalDraggable;
                const x = event.clientX - this.diffX;
                const y = event.clientY - this.diffY;
                modal.style.left = `${x}px`;
                modal.style.top = `${y}px`;
                this.modalPosition = [modal.style.left, modal.style.top]
            }
        },
    }
}
