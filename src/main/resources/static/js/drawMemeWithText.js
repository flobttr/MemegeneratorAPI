/* drawMemeWithText.js */
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

//Hier wird das Bild zusammen mit allen Text-Overlays ins Canva gezeichnet