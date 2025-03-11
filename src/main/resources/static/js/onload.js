/* onload.js */
window.onload = function() {
    // Canvas, Context und Bild für das Download-Feature
    memeCanvas = document.getElementById('memeCanvas');
    ctx = memeCanvas.getContext('2d');
    img = document.getElementById('memeImage');

    // Direkt ein Textfeld hinzufügen
    addTextField();
};

//instaliert beim Laden der Seite verschieden Canvas 