/* addTextField.js */
function addTextField() {
    const row = document.createElement('div');
    row.className = 'text-field-row';

    // Mehrzeiliges Textfeld
    const textInput = document.createElement('textarea');
    textInput.placeholder = 'Text eingeben...';
    textInput.style.resize = "vertical";
    textInput.addEventListener('input', updateMeme);

    // Farbeingabe
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#ffffff';
    colorInput.addEventListener('input', updateMeme);

    // Schriftgrößeneingabe (Slider)
    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'range';
    fontSizeInput.min = '10';
    fontSizeInput.max = '100';
    fontSizeInput.value = '24'; // Standard-Schriftgröße in Pixel
    fontSizeInput.addEventListener('input', updateMeme);

    row.appendChild(textInput);
    row.appendChild(colorInput);
    row.appendChild(fontSizeInput);

    document.getElementById('textFieldContainer').appendChild(row);

    textFields.push({ textInput, colorInput, fontSizeInput, overlay: null });
}
//Funktion die ein neues Textfeld samt Farbeingabe und Slider erstellt