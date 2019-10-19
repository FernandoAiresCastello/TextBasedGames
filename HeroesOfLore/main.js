//=============================================================================
//
//      HEROES OF LORE
//
//      2019 Programmed by Fernando Aires Castello
//
//=============================================================================

$(document).ready(() => main());

function main() {

    engineInit({
        windowTitle: 'Heroes Of Lore',
        gameTitle: '\u2694 HEROES OF LORE \u2694',
        buttonRows: 4,
        buttonCols: 3
    });

    engineSetBorderWidth(30);
    engineSetBorderColor(4);
    engineSetTitlePanelColor(15, 13);
    engineSetSidePanelColor(15, 5);
    engineSetOutputPanelColor(15, 5);
    engineSetInputPanelColor(15, 13);
    engineSetButtonsActiveColor(15, 6);
    engineSetButtonsHoverColor(15, 8);
    engineSetButtonsInactiveColor(15, 13);

    engineSetButton(0, 'Say hello', () => {
        enginePrintln('Hello world!');
    });

    engineSetButton(1, 'Clear', () => {
        engineClearOutput();
    });
}
