/* downloadMeme.js */
function downloadMeme() {
    drawMemeWithText();
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = memeCanvas.toDataURL("image/png");
    link.click();
}

// es ermöglicht den Download des Memes vor der Abgabe 