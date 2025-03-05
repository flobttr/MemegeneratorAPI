/* Array zur Speicherung der Text- und Farbeingaben */
let textFields = [];

// Beim Laden der Seite direkt ein Textfeld hinzufügen
window.onload = function() {
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

    textFields.push({ textInput, colorInput });
}

// Erzeugt die Overlays neu und macht sie draggable
function updateMeme() {
    const memeContainer = document.getElementById('memeContainer');

    // Alte Overlays entfernen
    const oldOverlays = memeContainer.querySelectorAll('.meme-text');
    oldOverlays.forEach(el => el.remove());

    // Für jedes Textfeld ein Overlay erstellen
    textFields.forEach((field, index) => {
        const textValue = field.textInput.value.trim();
        const colorValue = field.colorInput.value;

        if (textValue) {
            const overlay = document.createElement('div');
            overlay.className = 'meme-text';
            overlay.innerText = textValue;
            overlay.style.color = colorValue;

            // Startposition: leicht versetzt pro Feld
            overlay.style.top = (20 + index * 50) + 'px';
            overlay.style.left = '50px';

            memeContainer.appendChild(overlay);

            // Overlay verschiebbar machen
            makeDraggable(overlay, memeContainer);
        }
    });
}

// Funktion, um ein Element verschiebbar zu machen
function makeDraggable(element, container) {
    let offsetX, offsetY;

    element.addEventListener('mousedown', function(e) {
        e.preventDefault();

        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        function onMouseMove(e) {
            const containerRect = container.getBoundingClientRect();

            let newLeft = e.clientX - offsetX - containerRect.left;
            let newTop  = e.clientY - offsetY - containerRect.top;

            const maxLeft = containerRect.width - element.offsetWidth;
            const maxTop  = containerRect.height - element.offsetHeight;

            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft > maxLeft) newLeft = maxLeft;
            if (newTop > maxTop) newTop = maxTop;

            element.style.left = newLeft + 'px';
            element.style.top  = newTop  + 'px';
        }

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });
}

// Lädt nur das Originalbild herunter
function downloadMeme() {
    const memeImage = document.getElementById('memeImage');
    const imageURL = memeImage.src;

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'meme.jpg'; // oder meme.png
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
