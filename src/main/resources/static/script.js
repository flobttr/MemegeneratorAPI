/* Array zur Speicherung der Text-, Farb- und Schriftgrößeneingaben sowie der zugehörigen Overlay-Elemente */
let textFields = [];
let memeCanvas, ctx, img;

window.onload = function() {
    // Canvas, Context und Bild für das Download-Feature
    memeCanvas = document.getElementById('memeCanvas');
    ctx = memeCanvas.getContext('2d');
    img = document.getElementById('memeImage');

    // Direkt ein Textfeld hinzufügen
    addTextField();
};

// Neues Textfeld (Text, Farbe, Schriftgröße) hinzufügen
function addTextField() {
    const row = document.createElement('div');
    row.className = 'text-field-row';

    // Mehrzeiliges Textfeld
    const textInput = document.createElement('textarea');
    textInput.placeholder = 'Text eingeben...';
    textInput.style.resize = "vertical";
    textInput.addEventListener('input', updateMeme);

    // Farbeingabe
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#ffffff';
    colorInput.addEventListener('input', updateMeme);

    // Schriftgrößeneingabe (Slider)
    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'range';
    fontSizeInput.min = '10';
    fontSizeInput.max = '100';
    fontSizeInput.value = '24'; // Standard-Schriftgröße in Pixel
    fontSizeInput.addEventListener('input', updateMeme);

    row.appendChild(textInput);
    row.appendChild(colorInput);
    row.appendChild(fontSizeInput);

    document.getElementById('textFieldContainer').appendChild(row);

    textFields.push({ textInput, colorInput, fontSizeInput, overlay: null });
}

// Erzeugt oder aktualisiert die Overlays, ohne deren Position zurückzusetzen
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

// Funktion, um ein Element per Drag & Drop NUR innerhalb des Containers zu verschieben
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

// Zeichnet das Bild mit allen Texten auf das Canvas und lädt es herunter
function downloadMeme() {
    drawMemeWithText();
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = memeCanvas.toDataURL("image/png");
    link.click();
}

/**
 * Schreibt jedes vorhandene Text-Overlay ins Canvas
 * Damit sind alle Texte im finalen Download-Bild sichtbar
 */
function drawMemeWithText() {
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height);

    textFields.forEach(field => {
        if (field.overlay) {
            const overlay = field.overlay;
            const fontSize = overlay.style.fontSize || "24px";
            ctx.font = fontSize + " Arial";
            ctx.fillStyle = overlay.style.color || "white";
            ctx.textAlign = "left";

            const x = parseInt(overlay.style.left, 10);
            const y = parseInt(overlay.style.top, 10);

            // Textzeilen (bei Zeilenumbrüchen) einlesen
            const lines = overlay.innerText.split('\n');
            const fontSizeNumber = parseInt(fontSize, 10);
            const lineHeight = fontSizeNumber * 1.2;

            lines.forEach((line, index) => {
                ctx.fillText(line, x, y + lineHeight + (index * lineHeight));
            });
        }
    });
}
