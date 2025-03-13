/* drawMemeWithText.js */
/**
 * Zeichnet das Bild und alle Text-Overlays in das Canvas.
 * Dabei wird zunächst das Canvas geleert, dann das Hintergrundbild und anschließend
 * jeder Text (inklusive Zeilenumbrüchen) an der entsprechenden Position.
 */
function drawMemeWithText() {
    // Löscht das gesamte Canvas
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    // Zeichnet das Hintergrundbild (Meme) in voller Größe
    ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height);

    // Iteriere über alle registrierten Textfelder und zeichne das Overlay falls vorhanden
    textFields.forEach(field => {
        if (field.overlay) {
            const overlay = field.overlay;
            // Verwende die definierte Schriftgröße, Standardwert ist "24px"
            const fontSize = overlay.style.fontSize || "24px";
            ctx.font = fontSize + " Arial";
            ctx.fillStyle = overlay.style.color || "white";
            ctx.textAlign = "left";

            // Hole die Position des Overlays
            const x = parseInt(overlay.style.left, 10);
            const y = parseInt(overlay.style.top, 10);

            // Bei Zeilenumbrüchen den Text in einzelne Zeilen aufteilen
            const lines = overlay.innerText.split('\n');
            const fontSizeNumber = parseInt(fontSize, 10);
            const lineHeight = fontSizeNumber * 1.2;

            // Jede Zeile wird separat gezeichnet
            lines.forEach((line, index) => {
                ctx.fillText(line, x, y + lineHeight + (index * lineHeight));
            });
        }
    });
}

//Hier wird das Bild zusammen mit allen Text-Overlays ins Canva gezeichnet