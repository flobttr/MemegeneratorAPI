/* addTextField.js */
/**
 * Erstellt eine neue Zeile mit einem Textfeld, einem Farbauswahlfeld und einem Slider zur Schriftgrößeneinstellung.
 * Anschließend wird diese Zeile in den Container eingefügt und in das globale textFields-Array aufgenommen.
 */

function addTextField() {
    // Erzeugen eines neuen DIV-Elements als Zeile für die Eingabefelder
    const row = document.createElement('div');
    row.className = 'text-field-row';

    // Mehrzeiliges Textfeld zur Texteingabe
    const textInput = document.createElement('textarea');
    textInput.placeholder = 'Text eingeben...';
    textInput.style.resize = "vertical";
    // Bei jeder Änderung wird die Meme-Darstellung aktualisiert
    textInput.addEventListener('input', updateMeme);

    // Farbeingabe zur Auswahl der Textfarbe
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#ffffff'; // Standardfarbe: Weiß
    // Aktualisierung des Memes bei Farbänderung
    colorInput.addEventListener('input', updateMeme);

    // Slider zur Auswahl der Schriftgröße (in Pixel)
    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'range';
    fontSizeInput.min = '10';
    fontSizeInput.max = '100';
    fontSizeInput.value = '24'; // Standard-Schriftgröße in Pixel
    // Aktualisierung des Memes bei Änderung der Schriftgröße
    fontSizeInput.addEventListener('input', updateMeme);

    // Hinzufügen der einzelnen Eingabeelemente zur Zeile
    row.appendChild(textInput);
    row.appendChild(colorInput);
    row.appendChild(fontSizeInput);

    // Einfügen der Zeile in den Container, der die Textfelder hält
    document.getElementById('textFieldContainer').appendChild(row);

    // Speichern der Referenzen im globalen Array, damit später auf die Werte und das Overlay zugegriffen werden kann
    textFields.push({ textInput, colorInput, fontSizeInput, overlay: null });
}
//Funktion die ein neues Textfeld samt Farbeingabe und Slider erstellt