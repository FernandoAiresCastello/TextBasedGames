//=============================================================================
//
//      TEXT GAME ENGINE
//
//      2019 Programmed by Fernando Aires Castello
//
//=============================================================================

class Player {
    constructor() {
        this.scene = null;
        this.states = new States();
        this.objects = [];
    }
}

class World {
    constructor() {
        this.scenes = [];
    }

    addScene(scene) {
        this.scenes.push(scene);
    }

    getScene(name) {
        for (let i = 0; i < this.scenes.length; i++) {
            const scene = this.scenes[i];
            if (scene.name === name) {
                return scene;
            }
        }
        return null;
    }
}

class States {
    constructor() {
        this.states = [];
    }

    add(state) {
        this.states.push(state);
    }

    remove(state) {
        let index = null;
        for (let i = 0; i < this.states.length; i++) {
            if (state === this.states[i]) {
                index = i;
                break;
            }
        }
        if (index) {
            this.states.splice(index, 1);
        }
    }

    has(state) {
        for (let i = 0; i < this.states.length; i++) {
            if (state === this.states[i]) {
                return true;
            }
        }
        return false;
    }
}

class Scene {
    constructor() {
        this.name = 'Undefined';
        this.description = 'No description available.';
        this.states = new States();
        this.commands = [];
        this.objects = [];
        this.characters = [];
        this.exits = [];
    }

    executeCommand(commandText) {
        const command = this.getCommand(commandText);
        if (command) {
            command.execute();
        }
    }

    addCommand(text, func) {
        this.commands.push(new Command(text, func));
    }

    getCommand(commandText) {
        for (let i = 0; i < this.commands.length; i++) {
            const command = this.commands[i];
            if (commandText === command.text) {
                return command;
            }
        }
        return null;
    }
}

class Exit {
    constructor(direction, goFunction) {
        this.direction = direction;
        this.goFunction = goFunction;
        this.visible = true;
    }
}

class Character {
    constructor(name, lookFunction, talkFunction, attackFunction) {
        this.name = name;
        this.states = new States();
        this.lookFunction = lookFunction;
        this.talkFunction = talkFunction;
        this.attackFunction = attackFunction;
        this.visible = true;
    }
}

class GameObject {
    constructor(name, lookFunction, useFunction, takeFunction) {
        this.name = name;
        this.states = new States();
        this.lookFunction = lookFunction;
        this.useFunction = useFunction;
        this.takeFunction = takeFunction;
        this.visible = true;
    }
}

class Command {
    constructor(text, func) {
        this.text = text;
        this.func = func;
    }

    execute() {
        this.func();
    }
}

class Engine {
    constructor(initOptions) {
        this.init(initOptions);
        this.world = new World();
        this.player = new Player();
    }

    interpretCommand() {
        const inputField = $('#input-field');
        const command = inputField.val().trim();
        inputField.val('');

        if (command) {
            this.println(command);
        }
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
    
    init(initOptions) {
        if (!(initOptions.windowTitle && initOptions.gameTitle)) {
            this._error('engineInit: invalid initOptions');
        }
    
        this._initDocumentBody();
        this.setWindowTitle(initOptions.windowTitle);
        this.setGameTitle(initOptions.gameTitle);

        $('#input-field').keydown((e) => {
            if (e.key === "Enter") {
                this.interpretCommand();
                e.preventDefault();
            }
        });

        $('#send-button').click(() => {
            this.interpretCommand();
        });
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

    setInputFieldColor(forecolor, backcolor) {
        this._gui.InputFieldForeColor = forecolor;
        this._gui.InputFieldBackColor = backcolor;
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
        ActiveButtonForeColor: Color.Black,
        ActiveButtonBackColor: Color.White,
        HoverButtonForeColor: Color.Black,
        HoverButtonBackColor: Color.White,
        InactiveButtonForeColor: Color.White,
        InactiveButtonBackColor: Color.Gray,
        InputFieldForeColor: Color.Black,
        InputFieldBackColor: Color.White
    };
    
    _updateButtonCss() {
        const buttons = $('.input-table button');
    
        buttons.css('color', this._gui.ActiveButtonForeColor);
        buttons.css('background', this._gui.ActiveButtonBackColor);

        buttons.on('mouseleave', (event) => {
            $(event.target).css('color', this._gui.ActiveButtonForeColor);
            $(event.target).css('background', this._gui.ActiveButtonBackColor);
        });
        buttons.on('mouseenter', (event) => {
            $(event.target).css('color', this._gui.HoverButtonForeColor);
            $(event.target).css('background', this._gui.HoverButtonBackColor);
        });

        const inputField = $('.input-table input[type="text"]');

        inputField.css('color', this._gui.InputFieldForeColor);
        inputField.css('background', this._gui.InputFieldBackColor);
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
                    <table class="input-table">
                        <tr>
                            <td class="input-field-col">
                                <input id="input-field" type="text"></input>
                            </td>
                            <td class="send-button-col">
                                <button id="send-button">Send command</button>
                            </td>
                        </tr>
                    </table>
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
