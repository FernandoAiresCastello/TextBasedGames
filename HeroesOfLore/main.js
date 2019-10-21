//=============================================================================
//
//      HEROES OF LORE
//
//      2019 Programmed by Fernando Aires Castello
//
//=============================================================================

$(document).ready(() => main());

function main() {

    const engine = new Engine({
        windowTitle: 'Heroes Of Lore',
        gameTitle: '\u2694 HEROES OF LORE \u2694',
        buttonRows: 4,
        buttonCols: 3
    });

    engine.setBorderWidth(30);
    engine.setBorderColor(Color.Blue);
    engine.setTitlePanelColor(Color.White, Color.Magenta);
    engine.setSidePanelColor(Color.White, Color.LightBlue);
    engine.setOutputPanelColor(Color.White, Color.LightBlue);
    engine.setInputPanelColor(Color.White, Color.Magenta);
    engine.setButtonsActiveColor(Color.White, Color.DarkRed);
    engine.setButtonsHoverColor(Color.White, Color.Red);
    engine.setButtonsInactiveColor(Color.White, Color.Magenta);
    engine.setInputFieldColor(Color.White, Color.LightBlue);
}
