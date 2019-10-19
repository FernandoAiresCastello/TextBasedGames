//=============================================================================
//
//      TEXT GAME ENGINE
//
//      2019 Programmed by Fernando Aires Castello
//
//=============================================================================

class Scene {
    constructor() {
        this.title = 'Undefined';
    }
}

class Engine {
    constructor(initOptions) {
        this.init(initOptions);
    }

    println(html) {
        this.print(html + '<br/>');
    }
    
    print(html) {
        $('.output').append(html);
    }
    
    clearOutput() {
        $('.output').html('');
    }
    
    setButton(number, text, onclick) {
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
    
        this._updateButtonCss();
    }
    
    hideAllButtons() {
        for (let i = 0; i < this._gui.ButtonRows * this._gui.ButtonCols; i++) {
            this.setButton(i, null);
        }
    }
    
    init(initOptions) {
    
        if (!(initOptions.buttonCols && initOptions.buttonRows &&
            initOptions.windowTitle && initOptions.gameTitle)) {
            this._error('engineInit: invalid initOptions');
        }
    
        this._gui.ButtonRows = initOptions.buttonRows;
        this._gui.ButtonCols = initOptions.buttonCols;
    
        this._initDocumentBody();
        this._initButtons();
        this.setWindowTitle(initOptions.windowTitle);
        this.setGameTitle(initOptions.gameTitle);
    }
    
    setButtonsActiveColor(forecolor, backcolor) {
        this._gui.ActiveButtonForeColor = forecolor;
        this._gui.ActiveButtonBackColor = backcolor;
        this._updateButtonCss();
    }
    
    setButtonsHoverColor(forecolor, backcolor) {
        this._gui.HoverButtonForeColor = forecolor;
        this._gui.HoverButtonBackColor = backcolor;
        this._updateButtonCss();
    }
    
    setButtonsInactiveColor(forecolor, backcolor) {
        this._gui.InactiveButtonForeColor = forecolor;
        this._gui.InactiveButtonBackColor = backcolor;
        this._updateButtonCss();
    }
    
    setTitlePanelColor(forecolor, backcolor) {
        this.setPanelColor('title-panel', forecolor, backcolor);
    }
    
    setSidePanelColor(forecolor, backcolor) {
        this.setPanelColor('side-panel', forecolor, backcolor);
    }
    
    setOutputPanelColor(forecolor, backcolor) {
        this.setPanelColor('out-panel', forecolor, backcolor);
    }
    
    setInputPanelColor(forecolor, backcolor) {
        this.setPanelColor('in-panel', forecolor, backcolor);
    }
    
    setPanelColor(panelClass, forecolor, backcolor) {
        const panel = $('.' + panelClass);
        panel.css('color', forecolor);
        panel.css('background', backcolor);
    }
    
    setBorderWidth(width) {
        $('body').css('margin', width + 'px');
    }
    
    setBorderColor(borderColor) {
        $('body').css('background', borderColor);
    }
    
    setGameTitle(title) {
        $('.title-panel').html(title);
    }
    
    setWindowTitle(title) {
        $('title').html(title);
    }

    //=========================================================================
    //      PRIVATE API
    //=========================================================================

    _gui = {
        ButtonRows: 0,
        ButtonCols: 0,
        ActiveButtonForeColor: Color.Black,
        ActiveButtonBackColor: Color.White,
        HoverButtonForeColor: Color.Black,
        HoverButtonBackColor: Color.White,
        InactiveButtonForeColor: Color.White,
        InactiveButtonBackColor: Color.Gray
    };
    
    _updateButtonCss() {
        const activeButtons = $('.buttons-table button.active');
        const inactiveButtons = $('.buttons-table button.inactive');
    
        activeButtons.css('color', this._gui.ActiveButtonForeColor);
        activeButtons.css('background', this._gui.ActiveButtonBackColor);

        activeButtons.on('mouseleave', (event) => {
            $(event.target).css('color', this._gui.ActiveButtonForeColor);
            $(event.target).css('background', this._gui.ActiveButtonBackColor);
        });
        activeButtons.on('mouseenter', (event) => {
            $(event.target).css('color', this._gui.HoverButtonForeColor);
            $(event.target).css('background', this._gui.HoverButtonBackColor);
        });
    
        inactiveButtons.css('color', this._gui.InactiveButtonForeColor);
        inactiveButtons.css('background', this._gui.InactiveButtonBackColor);
    }
    
    _initButtons() {
        let buttonNumber = 0;
        const table = $('.buttons-table');
        for (let row = 0; row < this._gui.ButtonRows; row++) {
            let rowHtml = '';
            rowHtml += '<tr>';
            for (let col = 0; col < this._gui.ButtonCols; col++) {
                rowHtml += '<td>';
                rowHtml += '<button id="button-' + buttonNumber + '">Button ' + buttonNumber + '</button>';
                rowHtml += '</td>';
                buttonNumber++;
            }
            rowHtml += '</tr>';
            table.append(rowHtml);
        }
    
        $('.buttons-table td').css('width', 100 / this._gui.ButtonCols + '%');
    
        this.hideAllButtons();
    }
    
    _initDocumentBody() {
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
    
    _error(text) {
        const msg = 'TextGameEngine Error\n' + text;
        alert(msg);
        throw new Error(msg);
    }
}

let Color = {
    Black: '#000000',
    Green: '#40b64a',
    LightGreen: '#73ce7c',
    Blue: '#5955df',
    LightBlue: '#7e75f0',
    DarkRed: '#b75e51',
    Cyan: '#64daee',
    Red: '#d96459',
    LightRed: '#fe877c',
    Yellow: '#cac15e',
    LightYellow: '#ddce85',
    DarkGreen: '#3ca042',
    Magenta: '#b565b3',
    Gray: '#cacaca',
    White: '#ffffff'
};
