/* save.js */
/**
 * Speichert das aktuelle Meme, indem es den Inhalt des Canvas als Bild exportiert,
 * Spieler- und Lobby-Daten aus dem localStorage abruft und diese in einem Meme-Objekt zusammenfasst.
 * Dieses Objekt wird dann per POST an den Server gesendet.
 */
function saveMeme() {
    // Konvertiere den Canvas-Inhalt in einen Data-URL (als JPG)
    const dataURL = memeCanvas.toDataURL("image/jpg");
    //alert(dataURL); //zeig an, wie das Bild in base64 Codierung aussieht

    // Hole und parse die gespeicherten Nutzerdaten aus dem localStorage
    const userData = localStorage.getItem("userData");
    const user = JSON.parse(userData);
    const username = user.username;
    const userId = user.userId;

    // Hole und parse die gespeicherten Lobby-Daten aus dem localStorage
    const lobbyData = localStorage.getItem("lobbyData");
    const lobby = JSON.parse(lobbyData);
    const lobbyCode = lobby.lobbyCode;

    // Erstelle ein Meme-Objekt mit allen benötigten Informationen
    const meme = {
        imageData: dataURL,
        playerName: username,
        playerId: userId,
        lobbyCode: lobbyCode
    };

    // Sende das Meme-Objekt per POST an den Server-Endpunkt zum Speichern
    fetch('/api/memes/^^', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meme)
    })
        .then(response => response.text())
        .then(text => {
            // Optional: Zeige eine Erfolgsmeldung an (z.B. alert(text));
            // Leite anschließend den Benutzer zur Erfolgsseite weiter
            window.location.replace("/html/success.html");
        })
        .catch(error => {
            console.error('Fehler:', error);
            alert('Fehler beim Speichern des Memes.');
        });
}
