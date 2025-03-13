/* makeDraggable.js */
/**
 * Ermöglicht es, ein Element (z. B. ein Text-Overlay) per Drag-and-Drop innerhalb eines Containers zu verschieben.
 *
 * @param {HTMLElement} element - Das Element, das verschiebbar gemacht werden soll.
 * @param {HTMLElement} container - Der Container, innerhalb dessen das Element bewegt werden kann.
 */
function makeDraggable(element, container) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    // Beim Drücken der Maustaste: Startet das Dragging und speichert den Offset zum Element
    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        e.stopPropagation();
        e.preventDefault();
    });

    // Beim Bewegen der Maus: Falls Dragging aktiv ist, wird das Element neu positioniert
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();

        // Berechne die neuen Positionen relativ zum Container
        let newLeft = e.clientX - containerRect.left - offsetX;
        let newTop = e.clientY - containerRect.top - offsetY;

        // Grenzen, damit das Element den Container nicht verlässt
        const maxLeft = containerRect.width - elemRect.width;
        const maxTop = containerRect.height - elemRect.height;

        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft > maxLeft) newLeft = maxLeft;
        if (newTop > maxTop) newTop = maxTop;

        // Setze die neuen Positionen
        element.style.left = newLeft + 'px';
        element.style.top = newTop + 'px';
    });

    // Beim Loslassen der Maustaste: Beendet das Dragging
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });
}
