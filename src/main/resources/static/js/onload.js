/* onload.js */
/**
 * Initialisiert wichtige Elemente und Daten, sobald die Seite geladen wurde.
 * - Initialisiert das Canvas, den Zeichenkontext und das Hintergrundbild.
 * - Fügt automatisch ein Textfeld hinzu.
 * - Speichert Beispiel-Daten (Spieler und Lobby) im localStorage.
 */

window.onload = function() {
    // Hole Referenzen auf das Canvas, den Zeichenkontext und das Bild-Element
    memeCanvas = document.getElementById('memeCanvas');
    ctx = memeCanvas.getContext('2d');
    img = document.getElementById('memeImage');

    // Fügt beim Laden direkt ein neues Textfeld hinzu
    addTextField();

    // Beispiel-Daten für den Spieler (Spielername und SpielerID)
    let userData = {
        username: "User1",  // Hier den tatsächlichen Spielernamen einfügen
        userId: "12345"              // Hier die tatsächliche Spieler-ID einfügen
    };

    // Speichere die Spieler-Daten als JSON im localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Beispiel-Daten für den Lobby-Code
    let lobbyData = {
        lobbyCode: "123"  // Hier den tatsächlichen Lobby-Code einfügen
    };
    // Speichere die Lobby-Daten als JSON im localStorage
    localStorage.setItem("lobbyData", JSON.stringify(lobbyData));
};

