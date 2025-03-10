function saveMeme() {
    const dataURL = memeCanvas.toDataURL("image/png");

    // Erstelle das Meme-Objekt
    const meme = {
        imageData: dataURL, // Komma hier eingefügt
        // playerName und playerId optional; der Server füllt sie aus, falls nötig
    };

    fetch('/api/memes/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meme)
    })
        .then(response => response.text())
        .then(text => {
            // Optional: Erfolgsmeldung anzeigen, z. B. mit alert(text);
            // Danach sofort auf die neue Seite weiterleiten:
            window.location.href = "/success.html"; // oder ein anderer Pfad zu deiner neuen Seite
        })
        .catch(error => {
            console.error('Fehler:', error);
            alert('Fehler beim Speichern des Memes.');
        });
}
