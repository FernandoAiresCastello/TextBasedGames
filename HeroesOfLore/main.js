
$(document).ready(() => main());

function main() {
    engineInit('Heroes Of Lore', '\u2694 HEROES OF LORE \u2694', 4, 3);

    engineSetBorderWidth(30);
    engineSetBorderColor(4);
    engineSetPanelColor('title-panel', 15, 13);
    engineSetPanelColor('side-panel', 15, 5);
    engineSetPanelColor('out-panel', 15, 5);
    engineSetPanelColor('in-panel', 15, 13);
    engineSetButtonsActiveColor(15, 8);
    engineSetButtonsInactiveColor(15, 13);

    engineSetButton(0, 'Say hello', () => {
        enginePrintln('Hello world!');
    });

    engineSetButton(1, 'Clear', () => {
        engineClearOutput();
    });
}
