/* downloadMeme.js */
/**
 * Löst den Download des erstellten Memes aus.
 * Dabei wird zuerst das Meme mitsamt allen Text-Overlays in das Canvas gezeichnet,
 * anschließend wird ein Download-Link erzeugt und automatisch angeklickt.
 */

function downloadMeme() {
    // Zeichnet das Meme mit allen Text-Overlays auf das Canvas
    drawMemeWithText();

    // Erstellen eines unsichtbaren Links für den Download
    const link = document.createElement("a");
    link.download = "Dein Meisterwerk.jpg";
    link.href = memeCanvas.toDataURL("image/jpg");

    // Simuliert einen Klick auf den Link, um den Download zu starten
    link.click();
}

