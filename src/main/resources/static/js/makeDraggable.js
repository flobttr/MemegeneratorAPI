/* makeDraggable.js */
function makeDraggable(element, container) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        e.stopPropagation();
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();

        let newLeft = e.clientX - containerRect.left - offsetX;
        let newTop = e.clientY - containerRect.top - offsetY;

        const maxLeft = containerRect.width - elemRect.width;
        const maxTop = containerRect.height - elemRect.height;

        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft > maxLeft) newLeft = maxLeft;
        if (newTop > maxTop) newTop = maxTop;

        element.style.left = newLeft + 'px';
        element.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });
}
// Ermöglicht das verschieben von Elementen per Drag and Drop innerhalb des für das MemeTemplate vorgefertigeten Containers