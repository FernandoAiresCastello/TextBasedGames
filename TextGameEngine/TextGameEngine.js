//=============================================================================
//
//      TEXT GAME ENGINE
//
//      2019 Programmed by Fernando Aires Castello
//
//=============================================================================

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

    _engineUpdateButtonCss();
}

function engineHideAllButtons() {
    for (let i = 0; i < _EngineGui.ButtonRows * _EngineGui.ButtonCols; i++) {
        engineSetButton(i, null);
    }
}

function engineInit(initOptions) {

    if (!(initOptions.buttonCols && initOptions.buttonRows &&
        initOptions.windowTitle && initOptions.gameTitle)) {
        _engineError('engineInit: invalid initOptions');
    }

    _EngineGui.ButtonRows = initOptions.buttonRows;
    _EngineGui.ButtonCols = initOptions.buttonCols;

    engineInitColors();
    _engineInitDocumentBody();
    _engineInitButtons();
    engineSetWindowTitle(initOptions.windowTitle);
    engineSetGameTitle(initOptions.gameTitle);
}

function engineSetButtonsActiveColor(forecolor, backcolor) {
    _EngineGui.ActiveButtonForeColor = forecolor;
    _EngineGui.ActiveButtonBackColor = backcolor;
    _engineUpdateButtonCss();
}

function engineSetButtonsHoverColor(forecolor, backcolor) {
    _EngineGui.HoverButtonForeColor = forecolor;
    _EngineGui.HoverButtonBackColor = backcolor;
    _engineUpdateButtonCss();
}

function engineSetButtonsInactiveColor(forecolor, backcolor) {
    _EngineGui.InactiveButtonForeColor = forecolor;
    _EngineGui.InactiveButtonBackColor = backcolor;
    _engineUpdateButtonCss();
}

function engineSetTitlePanelColor(forecolor, backcolor) {
    engineSetPanelColor('title-panel', forecolor, backcolor);
}

function engineSetSidePanelColor(forecolor, backcolor) {
    engineSetPanelColor('side-panel', forecolor, backcolor);
}

function engineSetOutputPanelColor(forecolor, backcolor) {
    engineSetPanelColor('out-panel', forecolor, backcolor);
}

function engineSetInputPanelColor(forecolor, backcolor) {
    engineSetPanelColor('in-panel', forecolor, backcolor);
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
    return _EngineGui.Colors[index];
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
    _EngineGui.Colors.push(color);
}

function engineClearColors() {
    _EngineGui.Colors = [];
}

function engineSetGameTitle(title) {
    $('.title-panel').html(title);
}

function engineSetWindowTitle(title) {
    $('title').html(title);
}

//=============================================================================
//      PRIVATE API
//=============================================================================

const _EngineGui = {
    Colors: [],
    ButtonRows: 0,
    ButtonCols: 0,
    ActiveButtonForeColor: 1,
    ActiveButtonBackColor: 15,
    HoverButtonForeColor: 1,
    HoverButtonBackColor: 15,
    InactiveButtonForeColor: 15,
    InactiveButtonBackColor: 14
};

function _engineUpdateButtonCss() {
    const activeButtons = $('.buttons-table button.active');
    const inactiveButtons = $('.buttons-table button.inactive');

    activeButtons.css('color', engineColor(_EngineGui.ActiveButtonForeColor));
    activeButtons.css('background', engineColor(_EngineGui.ActiveButtonBackColor));
    activeButtons.mouseleave(function() {
        $(this).css('color', engineColor(_EngineGui.ActiveButtonForeColor));
        $(this).css('background', engineColor(_EngineGui.ActiveButtonBackColor));
    });
    activeButtons.mouseenter(function() {
        $(this).css('color', engineColor(_EngineGui.HoverButtonForeColor));
        $(this).css('background', engineColor(_EngineGui.HoverButtonBackColor));
    });

    inactiveButtons.css('color', engineColor(_EngineGui.InactiveButtonForeColor));
    inactiveButtons.css('background', engineColor(_EngineGui.InactiveButtonBackColor));
}

function _engineInitButtons() {
    let buttonNumber = 0;
    const table = $('.buttons-table');
    for (let row = 0; row < _EngineGui.ButtonRows; row++) {
        let rowHtml = '';
        rowHtml += '<tr>';
        for (let col = 0; col < _EngineGui.ButtonCols; col++) {
            rowHtml += '<td>';
            rowHtml += '<button id="button-' + buttonNumber + '">Button ' + buttonNumber + '</button>';
            rowHtml += '</td>';
            buttonNumber++;
        }
        rowHtml += '</tr>';
        table.append(rowHtml);
    }

    $('.buttons-table td').css('width', 100 / _EngineGui.ButtonCols + '%');

    engineHideAllButtons();
}

function _engineInitDocumentBody() {
    $('body').append(`
        <div class="content">
        <table class="panel-table">
        <tr>
            <td class="title-panel" colspan="2"></td>
        </tr>
        <tr>
            <td class="out-panel">
                <div class="output"></div>
            </td>
            <td class="side-panel"></td>
        </tr>
        <tr>
            <td class="in-panel" colspan="2">
                <table class="buttons-table"></table>
            </td>
        </tr>
        </table>
        </div>
    `);
}

function _engineError(text) {
    const msg = 'TextGameEngine Error\n' + text;
    alert(msg);
    throw new Error(msg);
}
