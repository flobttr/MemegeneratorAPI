/* Array zur Speicherung der Text- und Farbeingaben und der zugehörigen Overlay-Elemente */
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

// Neues Textfeld (Text + Farbe) hinzufügen
function addTextField() {
    const row = document.createElement('div');
    row.className = 'text-field-row';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Text eingeben...';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#ffffff'; // Standardfarbe: Weiß

    row.appendChild(textInput);
    row.appendChild(colorInput);

    document.getElementById('textFieldContainer').appendChild(row);

    // overlay: null => später wird hier das DOM-Element (Overlay) gespeichert
    textFields.push({ textInput, colorInput, overlay: null });
}

// Erzeugt oder aktualisiert die Overlays, ohne deren Position zurückzusetzen
function updateMeme() {
    const memeContainer = document.getElementById('memeContainer');

    textFields.forEach((field, index) => {
        const textValue = field.textInput.value.trim();
        const colorValue = field.colorInput.value;

        // Falls bereits ein Overlay existiert, aktualisieren wir nur Text und Farbe
        if (field.overlay) {
            if (textValue) {
                field.overlay.innerText = textValue;
                field.overlay.style.color = colorValue;
            } else {
                // Wenn kein Text mehr vorhanden ist, entfernen wir das Overlay
                field.overlay.remove();
                field.overlay = null;
            }
        } else {
            // Wenn noch kein Overlay existiert und Text vorhanden ist, erstellen wir es
            if (textValue) {
                const overlay = document.createElement('div');
                overlay.className = 'meme-text';
                overlay.innerText = textValue;
                overlay.style.color = colorValue;

                // Setze beim Erstellen eine Standardposition (z.B. etwas nach unten versetzt)
                overlay.style.top = (20 + index * 50) + 'px';
                overlay.style.left = '50px';

                memeContainer.appendChild(overlay);
                field.overlay = overlay;

                // Overlay verschiebbar machen und auf Container begrenzen
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

        // Abstand zwischen Mauszeiger und Elementrand
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;

        // Verhindert, dass andere Elemente (z.B. das Bild) das Event abfangen
        e.stopPropagation();
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // Positionen relativ zum Container berechnen
        const containerRect = container.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();

        // Neue Position (noch unbeschränkt)
        let newLeft = e.clientX - containerRect.left - offsetX;
        let newTop = e.clientY - containerRect.top - offsetY;

        // Begrenzungen ermitteln
        const maxLeft = containerRect.width - elemRect.width;
        const maxTop = containerRect.height - elemRect.height;

        // Linke Begrenzung
        if (newLeft < 0) newLeft = 0;
        // Obere Begrenzung
        if (newTop < 0) newTop = 0;
        // Rechte Begrenzung
        if (newLeft > maxLeft) newLeft = maxLeft;
        // Untere Begrenzung
        if (newTop > maxTop) newTop = maxTop;

        // Anwenden
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
    // Basisbild zeichnen
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height);

    // Für jedes Textfeld, das ein Overlay hat, Text ins Canvas zeichnen
    textFields.forEach(field => {
        if (field.overlay) {
            const overlay = field.overlay;
            ctx.font = "24px Arial";
            ctx.fillStyle = overlay.style.color || "white";
            ctx.textAlign = "left"; // oder "center", je nach Wunsch

            // Position (relativ zum Container) aus den style-Angaben
            const x = parseInt(overlay.style.left, 10);
            const y = parseInt(overlay.style.top, 10);

            // Text etwas tiefer setzen, damit es wie "mittig" wirkt
            ctx.fillText(overlay.innerText, x, y + 30);
        }
    });
}
