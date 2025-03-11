/* updateMeme.js */
function updateMeme() {
    const memeContainer = document.getElementById('memeContainer');

    textFields.forEach((field, index) => {
        const textValue = field.textInput.value;
        const colorValue = field.colorInput.value;
        const fontSizeValue = field.fontSizeInput.value; // Schriftgröße in Pixel

        if (field.overlay) {
            if (textValue.trim()) {
                field.overlay.innerText = textValue;
                field.overlay.style.color = colorValue;
                field.overlay.style.fontSize = fontSizeValue + 'px';
            } else {
                field.overlay.remove();
                field.overlay = null;
            }
        } else {
            if (textValue.trim()) {
                const overlay = document.createElement('div');
                overlay.className = 'meme-text';
                overlay.innerText = textValue;
                overlay.style.color = colorValue;
                overlay.style.fontSize = fontSizeValue + 'px';

                // Standardposition (etwas nach unten versetzt)
                overlay.style.top = (20 + index * 50) + 'px';
                overlay.style.left = '50px';

                memeContainer.appendChild(overlay);
                field.overlay = overlay;

                // Overlay verschiebbar machen (innerhalb des Containers)
                makeDraggable(overlay, memeContainer);
            }
        }
    });
}
//Durch diesen Code ist es möglich den Text dauerhaft zu aktualsieren