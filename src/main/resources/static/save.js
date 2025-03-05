function saveMeme() {
    drawMemeWithText();  // Zeichnet das Meme (Basisbild + Texte) in das Canvas

    // Hier legst du das Format fest – z. B. "image/png" oder "image/jpeg"
    const dataURL = memeCanvas.toDataURL("image/png");

    fetch('/saveMeme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageData: dataURL })
    })
        .then(response => response.json())
        .then(data => {
            if (data.filePath) {
                alert('Meme gespeichert unter: ' + data.filePath);
            } else {
                alert('Meme konnte nicht gespeichert werden: ' + JSON.stringify(data));
            }
        })
        .catch(error => {
            console.error('Fehler beim Speichern:', error);
            alert('Fehler beim Speichern des Memes.');
        });
}
