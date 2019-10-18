
const EngineGui = {
    Colors: [],
    ButtonRows: 0,
    ButtonCols: 0,
    ActiveButtonForeColor: 1,
    ActiveButtonBackColor: 15,
    InactiveButtonForeColor: 15,
    InactiveButtonBackColor: 14
};

function enginePrintln(html) {
    enginePrint(html + '<br/>');
}

function enginePrint(html) {
    $('.output').append(html);
}

function engineClearOutput() {
    $('.output').html('');
}

function engineSetButton(number, text, onclick) {
    const button = $('#button-' + number);

    if (text) {
        button.html(text);
        button.removeClass('inactive');
        button.addClass('active');
        button.click(onclick);
    }
    else {
        button.html('&nbsp;');
        button.removeClass('active');
        button.addClass('inactive');
        button.click(null);
    }

    engineUpdateButtonCss();
}

function engineHideAllButtons() {
    for (let i = 0; i < EngineGui.ButtonRows * EngineGui.ButtonCols; i++) {
        engineSetButton(i, null);
    }
}

function engineInit(windowTitle, gameTitle, buttonRows, buttonCols) {

    EngineGui.ButtonRows = buttonRows;
    EngineGui.ButtonCols = buttonCols;

    engineInitDocumentBody();
    engineInitColors();
    engineInitButtons();
    engineSetWindowTitle(windowTitle);
    engineSetGameTitle(gameTitle);
}

function engineInitButtons() {
    let buttonNumber = 0;
    const table = $('.buttons-table');
    for (let row = 0; row < EngineGui.ButtonRows; row++) {
        let rowHtml = '';
        rowHtml += '<tr>';
        for (let col = 0; col < EngineGui.ButtonCols; col++) {
            rowHtml += '<td>';
            rowHtml += '<button id="button-' + buttonNumber + '">Button ' + buttonNumber + '</button>';
            rowHtml += '</td>';
            buttonNumber++;
        }
        rowHtml += '</tr>';
        table.append(rowHtml);
    }

    $('.buttons-table td').css('width', 100 / EngineGui.ButtonCols + '%');

    engineHideAllButtons();
}

function engineUpdateButtonCss() {
    const activeButtons = $('.buttons-table button.active');
    const inactiveButtons = $('.buttons-table button.inactive');

    activeButtons.css('color', engineColor(EngineGui.ActiveButtonForeColor));
    activeButtons.css('background', engineColor(EngineGui.ActiveButtonBackColor));
    inactiveButtons.css('color', engineColor(EngineGui.InactiveButtonForeColor));
    inactiveButtons.css('background', engineColor(EngineGui.InactiveButtonBackColor));
}

function engineSetButtonsActiveColor(forecolor, backcolor) {
    EngineGui.ActiveButtonForeColor = forecolor;
    EngineGui.ActiveButtonBackColor = backcolor;
    engineUpdateButtonCss();
}

function engineSetButtonsInactiveColor(forecolor, backcolor) {
    EngineGui.InactiveButtonForeColor = forecolor;
    EngineGui.InactiveButtonBackColor = backcolor;
    engineUpdateButtonCss();
}

function engineSetPanelColor(panelClass, forecolor, backcolor) {
    const panel = $('.' + panelClass);
    panel.css('color', engineColor(forecolor));
    panel.css('background', engineColor(backcolor));
}

function engineSetBorderWidth(width) {
    $('body').css('margin', width + 'px');
}

function engineSetBorderColor(borderColor) {
    $('body').css('background', engineColor(borderColor));
}

function engineColor(index) {
    return EngineGui.Colors[index];
}

function engineInitColors() {
    engineClearColors();
    engineAddColor('#000000');
    engineAddColor('#000000');
    engineAddColor('#40b64a');
    engineAddColor('#73ce7c');
    engineAddColor('#5955df');
    engineAddColor('#7e75f0');
    engineAddColor('#b75e51');
    engineAddColor('#64daee');
    engineAddColor('#d96459');
    engineAddColor('#fe877c');
    engineAddColor('#cac15e');
    engineAddColor('#ddce85');
    engineAddColor('#3ca042');
    engineAddColor('#b565b3');
    engineAddColor('#cacaca');
    engineAddColor('#ffffff');
}

function engineAddColor(color) {
    EngineGui.Colors.push(color);
}

function engineClearColors() {
    EngineGui.Colors = [];
}

function engineSetGameTitle(title) {
    $('.title-panel').html(title);
}

function engineSetWindowTitle(title) {
    $('title').html(title);
}

function engineInitDocumentBody() {
    $('body').append(buildDocumentBody());
}

function buildDocumentBody() {
    return `
        <div class="content">
            <table class="panel-table">
                <tr>
                    <td class="title-panel" colspan="2">
                    </td>
                </tr>
                <tr>
                    <td class="out-panel">
                        <div class="output"></div>
                    </td>
                    <td class="side-panel">
                    </td>
                </tr>
                <tr>
                    <td class="in-panel" colspan="2">
                        <table class="buttons-table">
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    `
}
