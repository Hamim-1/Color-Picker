const hexColor = document.getElementById('hexColor');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const rgbColor = document.getElementById('rgbColor');
const message = document.getElementById('message');
const section2 = document.getElementById('section2');
const r = document.getElementById('redValue');
const g = document.getElementById('greenValue');
const b = document.getElementById('blueValue');
const redRange = document.getElementById('red');
const greenRange = document.getElementById('green');
const blueRange = document.getElementById('blue');
const hexRadio = document.getElementById('hexColorMode');
const rgbRadio = document.getElementById('rgbColorMode');
const presetColorParent = document.getElementById('presetColorParent');
const presetColor = ['#1ddaee', '#d5a2c9', '#8bc694', '#b2ab6e', '#ecfd1a', '#89b6a3', '#12bb42', '#2bfa56', '#c2e456', '#e00085', '#1db6a3', '#3f7174', '#86c6a0', '#ff00f6', '#d641f6', '#d4d595', '#21d21f', '#d6d21f', '#d649b4', '#39c2b4', '#845a58', '#42fb99', '#319dc1', '#99fe86'];

if (localStorage.getItem('colors')) {
    var customColorsList = [];
    const colors = localStorage.getItem('colors');
    JSON.parse(colors).forEach(clr => {
        customColorsList.push(clr);
    });
}
else {
    customColorsList = [];
}



function GenerateColor() {
    const hexCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '#';
    for (let i = 0; i < 6; i++) {

        const randomCode = Math.round(Math.random() * 15);

        const element = hexCode[randomCode];

        color += element;
    }
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);
    r.innerText = red;
    g.innerText = green;
    b.innerText = blue;
    redRange.value = red;
    greenRange.value = green;
    blueRange.value = blue
    section2.style.background = color;
    rgbColor.value = `rgb(${red},${green},${blue})`;
    hexColor.value = color.substring(1);
}
function componentToHex(component) {
    const hex = component.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
const customizeColor = () => {
    r.innerHTML = redRange.value;
    g.innerText = greenRange.value;
    b.innerText = blueRange.value;
    const redCode = parseInt(redRange.value);
    const greenCode = parseInt(greenRange.value);
    const blueCode = parseInt(blueRange.value);
    const red = componentToHex(redCode);
    const green = componentToHex(greenCode);
    const blue = componentToHex(blueCode);
    const UpdateHex = `${red}${green}${blue}`;
    section2.style.background = '#' + UpdateHex;
    hexColor.value = UpdateHex;
    rgbColor.value = `rgb(${redCode},${greenCode},${blueCode})`;
}

copyBtn.onclick = () => {
    if (hexRadio.checked) {
        navigator.clipboard.writeText(hexColor.value);
        if (isValidHex(hexColor.value)) {
            navigator.clipboard.writeText('#' + hexColor.value);
            message.style.right = '50px';
            message.style.opacity = 1;
            message.innerText = 'Copied!';
            setTimeout(() => {
                message.style.right = '-300px';
                message.style.opacity = 0;
            }, 1000)
        } else {
            alert('Hex Color is not valid')
        }
    }
    if (rgbRadio.checked) {
        navigator.clipboard.writeText(rgbColor.value);
        message.innerText = 'Copied!';
        message.style.right = '50px';
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.right = '-300px';
            message.style.opacity = 0;
        }, 1000)
    }
}



/**
 * @param {string} color : ;
 */
function isValidHex(color) {
    if (color.length != 6) return false;
    return /^[0-9a-f]{6}$/i.test(color)
}

hexColor.addEventListener('keyup', (e) => {
    let color = e.target.value;
    if (isValidHex(color) && color.length === 6) {
        section2.style.background = '#' + color;
        if (color.length === 6) {
            const red = parseInt(color.slice(0, 2), 16);
            const green = parseInt(color.slice(2, 4), 16);
            const blue = parseInt(color.slice(4), 16);
            rgbColor.value = `rgb(${red},${green},${blue})`;
            redRange.value = red;
            greenRange.value = green;
            blueRange.value = blue;
            r.innerText = red;
            g.innerText = green;
            b.innerText = blue;
        }
    }
    else if (color.length > 6) {
        message.innerText = 'Not allow more than 6!';
        message.style.right = '50px';
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.right = '-300px';
            message.style.opacity = 0;
        }, 2500)
    }
})
function setPresetColor() {
    for (let i = 0; i < presetColor.length; i++) {
        const color = presetColor[i];
        const div = document.createElement('div');
        div.setAttribute('color', color)
        div.className = 'presetColorBox';
        div.style.background = color;
        presetColorParent.appendChild(div);
    }
}
setPresetColor();
presetColorParent.addEventListener('click', (event) => {
    if (event.target.className == 'presetColorBox') {
        navigator.clipboard.writeText(event.target.getAttribute('color'));
        message.innerText = 'Copied!';
        message.style.right = '50px';
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.right = '-300px';
            message.style.opacity = 0;
        }, 1000)
    }
});
function fixedColor() {
    let savedColors;
    if (localStorage.getItem('colors')) {
        savedColors = JSON.parse(localStorage.getItem('colors'));
        const customColorsString = JSON.stringify(savedColors);
        localStorage.setItem('allcolors', customColorsString);
    }
    AllsavedColors = JSON.parse(localStorage.getItem('colors'));

    for (let i = 0; i < AllsavedColors.length; i++) {
        const color = AllsavedColors[i];
        const div = document.createElement('div');
        div.className = 'customColorBox';
        div.setAttribute('color', color);
        div.style.background = color;
        customColorParent.insertBefore(div, customColorParent.firstChild);
    }

}
saveBtn.onclick = setCustomColor;

function setCustomColor() {
    if (!customColorsList.includes('#' + hexColor.value)) {
        if (customColorParent.childNodes.length < 24) {
            const div = document.createElement('div');
            div.className = 'customColorBox';
            customColorsList.push('#' + hexColor.value);
            div.setAttribute('color', '#' + hexColor.value)
            div.style.background = '#' + hexColor.value;
            customColorParent.insertBefore(div, customColorParent.firstChild);
            const customColorsString = JSON.stringify(customColorsList);
            localStorage.setItem('colors', customColorsString);
        }
    }
    else {
        alert('Color is Already Saved')
    }


}

customColorParent.onclick = copySaveColor;

function copySaveColor(event) {

    if (event.target.className == 'customColorBox') {
        navigator.clipboard.writeText(event.target.getAttribute('color'));
        message.innerText = 'Copied!';
        message.style.right = '50px';
        message.style.opacity = 1;
        setTimeout(() => {
            message.style.right = '-300px';
            message.style.opacity = 0;
        }, 1000)
    }

}
