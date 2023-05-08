"use strict";
const COORDS_ID = 'bookmarklet-coords';
const POINTS_PER_INCH = 72;
const US_LETTER_WIDTH_PT = 8.5 * POINTS_PER_INCH;
const US_LETTER_HEIGHT_PT = 11 * POINTS_PER_INCH;
function findTextLayer(el) {
    if (el.classList.contains('textLayer'))
        return el;
    if (el.parentNode && el.parentNode instanceof Element) {
        return findTextLayer(el.parentNode);
    }
    return null;
}
function showCoords(x, y) {
    let el = document.getElementById(COORDS_ID);
    if (!el) {
        el = document.createElement('div');
        el.id = COORDS_ID;
        document.body.appendChild(el);
        console.log("cool", el);
    }
    el.textContent = `${x} ; ${y}`;
}
function removeCoords() {
    let el = document.getElementById(COORDS_ID);
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}
window.addEventListener('load', () => {
    window.addEventListener('mousemove', event => {
        if (event.target instanceof Element) {
            const textLayer = findTextLayer(event.target);
            if (textLayer) {
                const rect = textLayer.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                // const ptX = Math.floor((x / rect.width) * US_LETTER_WIDTH_PT);
                // const ptY = Math.floor(US_LETTER_HEIGHT_PT - (y / rect.height) * US_LETTER_HEIGHT_PT);
                const ptX = ((x / rect.width) * US_LETTER_WIDTH_PT).toFixed(3);
                const ptY = (US_LETTER_HEIGHT_PT - (y / rect.height) * US_LETTER_HEIGHT_PT).toFixed(3);
                showCoords(ptX, ptY);
            }
            else {
                removeCoords();
            }
        }
    });
});
